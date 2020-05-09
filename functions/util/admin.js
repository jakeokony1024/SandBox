const admin = require('firebase-admin');
// const firebase = require('firebase');
var serviceAccount = require('../sandbox-356b4-firebase-adminsdk-r1jfl-4cd8225b57.json');
// const config = require('../util/config.js');
// firebase.initializeApp(config);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

module.exports = {db, admin};
