module.exports = {
    sendMessage: (req, callback) => {
        const message = req.body.message;
        console.log(message);
		req.con.query(`INSERT INTO messages (text, recipient, sender, conversation) VALUES ("asdf", "1", "2", "1")`, (err, results) => {
            if (err) {
                console.log(err);
				callback("Unable to send message.");
            }
		});
	},
}
