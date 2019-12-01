module.exports = {

	post: (req, callback) => {
		const subject = req.body.subject;
        const content = req.body.content;
        const topic = req.body.topic;
        const user = req.session.userId

		req.con.query(`INSERT INTO posts (subject, content, topic, creator) VALUES ("${subject}", "${content}", "${topic}", "${user}")`, (err, results) => {
            if (err) {
                console.log(err);
				callback("Unable to post.");
            }
		});
    },

    getPosts: (req, callback) => {
        req.session.pagination = parseInt(req.session.pagination, 10) + parseInt(req.params.pagination, 10);

        if (parseInt(req.session.pagination, 10) < 0)
            req.session.pagination = 0;

        req.con.query(`select id, subject, content, topic, firstname, lastname, imageurl, posts.date from posts join user on posts.creator = user.iduser order by posts.date desc limit ${5 * req.session.pagination}, 5`, (err, results) => {
            if (err) {
                console.log(err);
                callback("Unable to fetch discussion/posts.");
            }
            callback(null, results);
        })
    },
}
