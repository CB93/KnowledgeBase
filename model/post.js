module.exports = {

	post: (req, callback) => {
		const subject = req.body.subject;
		const content = req.body.content;

		req.con.query(`INSERT INTO posts (subject, content) VALUES ("${subject}", "${content}")`, (err, results) => {
            if (err) {
                console.log(err);
				callback("Unable to post.");
            }
		});
	},
}
