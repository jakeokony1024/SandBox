const {db} = require('./admin.js');

module.exports = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        idToken = req.headers.authorization.split('Bearer ')[1];
        console.log('id token', idToken);
    }
    else {
        console.error('No token found');
        return res.status(403).json({error: 'Unauthorized'});
    }
    db.auth().verifyIdToken(idToken)//admin
        .then((decodedToken) => {
            req.user = decodedToken;
            console.log(decodedToken);
            return db.collection('users')
            .where('userId', '==', req.user.uid)
            .limit(1)
            .get();
        })
        .then((data) => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch((err) => {
            console.error('Error while verifying token ', err);
            return res.status(403).json(err);
        });
}