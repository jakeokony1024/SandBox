const firebase = require('firebase');
const config = require('./config.js');
firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = {db, config};