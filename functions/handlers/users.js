const {db, admin} = require('../util/admin.js');
const firebase = require('firebase');
const config = require('../util/config.js');
firebase.initializeApp(config);
const {validateSignUpData, validateLoginData, reduceUserDetails} = require('../util/validators.js');

exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    const {valid, errors} = validateSignUpData(newUser);
    if(!valid){
        return res.status(400).json(errors);
    }

    const noImg = 'user.png';

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get()
    .then((doc) => {
        if(doc.exists){
            return res.status(400).json({handle: 'This handle is already taken'});
        }
        else{
            return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
     })
    .then((data) => {
        userId = data.user.uid;
        console.log('user id: ' +userId);
        console.log('user token: ' + data.user.getIdToken());
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
            userId
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({token});
    })
    .catch((err) => {
        console.error(err);
        if(err.code === 'auth/email-already-in-use'){
            return res.status(400).json({email: 'Email already in use'});
        }
        else{
            return res.status(500).json({general: 'Something went wrong please try again'});
        }
    });
};

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);
    if(!valid){
        return res.status(400).json(errors);
    }

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return res.json({token});
    })
    .catch((err) => {
        console.error(err);
        return res.status(403).json({general: 'Wrong credentials, please try again'});
    });
};

exports.addUserDetails = (req, res) => {
    let userDetails= reduceUserDetails(req.body);
    db.doc(`/users/${req.user.handle}`).update(userDetails)
    .then(() => {
        return res.json({message: 'Details added successfully'});
    })
    .catch((err) =>{
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};

exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`).get()
    .then((doc) => {
        if(doc.exists){
            userData.credentials = doc.data();
            return db.collection('likes')
            .where('userHandle', "==", req.user.handle)
            .get();
        }
    })
    .then((data) => {
        userData.likes = [];
        data.forEach((doc) => {
            userData.likes.push(doc.data());
        });
        return db.collection('notifications')
        .where('recipient', '==', req.user.handle)
            .orderBy('createdAt', 'desc').get();
    })
    .then((data) =>{
        userData.notifications = [];
        data.forEach((doc) => {
            userData.notifications.push({
                recipient: doc.data().recipient,
                sender: doc.data().sender,
                createdAt: doc.data().createdAt,
                chatId: doc.data().chatId,
                type: doc.data().type,
                read: doc.data().read,
                notificationId: doc.id
            });
        });
        return res.json(userData);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};

exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});
    let imageFileName;
    let imageToBeUploaded = {};

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        // console.log("fieldname", fieldname);
        // console.log ('filename', filename);
        // console.log('mimetype', mimetype);
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({error: 'Wrong file type submitted'});
        }
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() *1000000000000).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin.storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype                    
                    },
                },
            })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/users/${req.user.handle}`).update({imageUrl});
        })  
        .then(() => {
            return res.json({message: 'Image uploaded susccesfully'});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: "Something went wrong"});
        });
    });
    busboy.end(req.rawBody);
};

exports.getUserDetails = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.params.handle}`).get()
        .then((doc) => {
            if(doc.exists){
                userData.user = doc.data();
                return db.collection('chatLog')
                .where('userHandle', '==', req.params.handle)
                .orderBy('createdAt', 'desc')
                .get();
            }
            else {
                return res.status(404).json({error: 'User not found'});
            }
        })
        .then((data) => {
            userData.chatLog = [];
            data.forEach((doc) => {
                userData.chatLog.push({
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                    userHandle: doc.data().userHandle,
                    userImage: doc.data().userImage,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    chatId: doc.id
                })
            });
            return res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });    
};

exports.markNotificationsRead = (req, res) => {
    let batch = db.batch();
    req.body.forEach((notificationId) => {
        const notification = db.doc(`/notifications/${notificationId}`);
        batch.update(notification, {read: true});
    });
    batch.commit()
    .then(() => {
        return res.json({message: 'Notification marked read'});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};