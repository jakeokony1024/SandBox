const firebase = require('firebase');
const config = require('../util/config.js');
firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = {db, config};