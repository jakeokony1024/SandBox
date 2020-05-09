const firebase = require('firebase');
const config = require('./config.js.js.js');
firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = {db, config};