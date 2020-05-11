
const functions = require('firebase-functions');
const express = require('express');
const app = express();
const FBAuth = require('./util/fbAuth.js');
const {getAllChatLogs, postIntoChatLog} = require('./handlers/chatlog.js');
const {signUp, login, uploadImage} = require('./handlers/users.js');

//chat log route
app.get('/chatLog', getAllChatLogs);
app.post('/chatLog', FBAuth, postIntoChatLog);

//users route
app.post("/signup", signUp);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);

exports.api = functions.https.onRequest(app);