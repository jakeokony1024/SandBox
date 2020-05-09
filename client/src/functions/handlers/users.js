const {db, config, firebase} = require('../util/admin.js.js.js');
const {validateSignUpData, validateLoginData} = require('../util/validators.js.js.js');

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
    db.collection(`users/${newUser.handle}`).doc().get()//admin.doc(``)
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
        return db.collection(`/users/${newUser.handle}`).doc().set(userCredentials);
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
            return res.status(500).json({error: err.code});
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
        if(err.code === 'auth/wrong-password'){
            return res.status(403).json({general: 'Wrong credentials, please try again'})
        }
        else {
            return res.status(500).json({error: err.code});
        }
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
        console.log("fieldname", fieldname);
        console.log ('filename', filename);
        console.log('mimetype', mimetype);
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(Math.random() *1000000000000).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        db.storage().bucket().upload(imageToBeUploaded.filepath, {//admin
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype//,
                    // firebaseStorageDownloadTokens: generatedToken,
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