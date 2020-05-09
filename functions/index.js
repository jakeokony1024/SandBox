const functions = require('firebase-functions');
const express = require('express');
const app = express();
const FBAuth = require('./util/fbAuth.js');
const {getAllChatLogs, postIntoChatLog, getChatLog, likeChat,
    unlikeChat, commentOnChat, deleteChat} = require('./handlers/chatlog.js');
const {signUp, login, uploadImage, 
    addUserDetails, getAuthenticatedUser, getUserDetails,
    markNotificationsRead} = require('./handlers/users.js');
const {db} = require('./util/admin');

//chat log route
app.get('/chatLog', getAllChatLogs);
app.post('/chatLog', FBAuth, postIntoChatLog);
app.get('/chatLog/:chatId', getChatLog);
app.delete('/chatLog/:chatId', FBAuth, deleteChat);
app.get('/chatLog/:chatId/like', FBAuth, likeChat);
app.get('/chatLog/:chatId/unlike', FBAuth, unlikeChat);

app.post('/chatLog/:chatId/comment', FBAuth, commentOnChat);

//users route
app.post("/signup", signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnLike = functions.firestore
    .document('likes/{id}')
    .onCreate((snapshot) => {
        return db
        .doc(`/chatLog/${snapshot.data().chatId}`)
        .get()
        .then((doc) => {
            if(doc.exist && doc.data().userHandle !== snapshot.data().userHandle){
                return db.doc(`/notifications/${snapshot.id}`).set({
                    createdAt: new Date().toISOString(),
                    recipient: doc.data().userHandle,
                    sender: snapshot.data().userHandle,
                    type: 'like',
                    read: false,
                    chatId: doc.id
                });
            }
        })
        .catch((err) =>{
            console.error(err);
        });
});

exports.deleteNotificationOnUnlike = functions.firestore
    .document('likes/{id}')
    .onDelete((snapshot) => {
        return db
        .doc(`/notifications/${snapshot.id}`)
        .delete()
        .catch((err) =>{
            console.error(err);
            return;
        });
});

exports.createNotificationsOnComment = functions.firestore
.document('comments/{id}')
.onCreate((snapshot) => {
    return db
    .doc(`/chatLog/${snapshot.data().chatId}`)
    .get()
    .then((doc) => {
        if(doc.exists && doc.data().userHandle !== snapshot.data().userHandle){
            return db.doc(`/notifications/${snapshot.id}`).set({
                createdAt: new Date().toISOString(),
                recipient: doc.data().userHandle,
                sender: snapshot.data().userHandle,
                type: 'comment',
                read: false,
                chatId: doc.id
            });
        }
    })
    .catch((err) =>{
        console.error(err);
        return;
    });
});

exports.onUserImageChange = functions.firestore.document('users/{userId}')
.onUpdate((change) =>{
    console.log(change.before.data());
    console.log(change.after.data());
    if(change.before.data().imageUrl != change.after.data().imageUrl){
        console.log('Image has changed');
        const batch = db.batch();
        return db.collection('chatLog')
            .where('userHandle', '==', change.before.data().handle).get()
            .then((data) => {
                data.forEach((doc) => {
                    const chat = db.doc(`/chatLog/${doc.id}`);
                    batch.update(chat, {userImage: change.after.data().imageUrl});
                });
            return batch.commit();
        });
    }
    else {
        return true;
    }
});

exports.onChatDelete = functions.firestore.document('chatLog/{chatId}')
    .onDelete((snapshot, context) =>{
        const chatId = context.params.chatId;
        const batch = db.batch();
        return db.collection('comments').where('chatId', '==', chatId)
        .get()
        .then((data) => {
            data.forEach((doc) => {
                batch.delete(db.doc(`/comments/${doc.id}`));
            });
            return db.collection('likes').where('chatId', '==', chatId).get();
        })
        .then((data) => {
            data.forEach((doc) => {
                batch.delete(db.doc(`/likes/${doc.id}`));
            });
            return db.collection('notifications').where('chatId', '==', chatId).get();
        })
        .then((data) => {
            data.forEach((doc) => {
                batch.delete(db.doc(`/notifications/${doc.id}`));
            });
            return batch.commit();
        })
        .catch((err) => {
            console.error(err);
        });
});