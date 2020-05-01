const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

const firebase = require('firebase');
const config = {
    apiKey: "AIzaSyD8u_-Wu6DedgCrG9Qe12Gfikd9qrVAnmM",
    authDomain: "sandbox-356b4.firebaseapp.com",
    databaseURL: "https://sandbox-356b4.firebaseio.com",
    projectId: "sandbox-356b4",
    storageBucket: "sandbox-356b4.appspot.com",
    messagingSenderId: "1089881472961",
    appId: "1:1089881472961:web:7029bb5b0648713ec8b940",
    measurementId: "G-TF0T0Y6FYV"
};
firebase.initializeApp(config);

app.get("/", (req, res) => console.log('working'));

app.post("/signup", (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    };

    firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
        return  res
        .status(201)
        .json({ message: `user ${data.user.uid} signed up succesfully` });
    })
    .catch((err) => {
    console.error(err);
    return res.status(500).json({error: err.code});
    });
});

exports.api = functions.https.onRequest(app);
// db.doc(`/users/${newUser.handle}`).get()
//     .then((doc) => {
//         if(doc.exists){
//             return res.status(400).json({handle: `This handle is already taken`});
//         }
//         else{
//             return firebase
//             .auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
//         }
//     })
//     .then((data) => {
//         return data.user.getIdToken();
//     })
//     .then((token) => {
//         return res.status(201).json({token});
//     })
//     .catch((err) => {
//         console.error(err);
//         return res.status(500).json({error: err.code});
//     });