module.exports = {
    sendMessage: (req, callback) => {
        const message = req.body.message;
        const recipient = req.body.recipient;
        const sender = req.body.sender;
        const conversation = req.body.conversation;

		req.con.query(`INSERT INTO messages (text, recipient, sender, conversation) VALUES ("asdf", "1", "2", "1")`, (err, results) => {
            if (err) {
                console.log(err);
				callback("Unable to send message.");
            }
		});
	},
}
