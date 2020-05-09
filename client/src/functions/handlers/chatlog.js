const {db} = require('../util/admin.js.js.js');

exports.getAllChatLogs = (req, res) => {
    db.collection('chatLog')
    .orderBy('createAt', 'desc')
    .get()
    .then((data) => {
        let chat =[];
        data.forEach((doc) => {
            chat.push({
                chatId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt,
                commentCount: doc.data().commentCount,
                likeCount: doc.data().likeCount
            });
        });
        return res.json(chat);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({error: err.code});
    });
}

exports.postIntoChatLog = (req, res) => {
    if (req.body.body.trim() === ''){
        return res.status(400).json({body: 'Body must not be empty'});
    }

    const newChat = {
        body: req.body.body,
        userHandle: req.user.handle,
        createdAt: new Date().toISOString()
    };

    db.collection('chatLog')
    .add(newChat)
    .then((doc) => {
        res.json({message: `document ${doc.id} created successfully`});
    })
    .catch((err) => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    });
}