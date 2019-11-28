const db = require("../model/message")

module.exports = {
    sendMessage: (req, res) => {
        db.sendMessage(req, (err) => {
            res.sendStatus(500);
        });
        res.sendStatus(200);
    },
}
