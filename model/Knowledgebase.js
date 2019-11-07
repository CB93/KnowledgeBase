module.exports = {

	getUser: (req, callback) => {
		
		const username = req.body.username
		const password = req.body.password

		req.con.query(`SELECT * FROM user WHERE name=?`, [username], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))

			} else {
				if (results.length > 0) {
					if (results[0].password == password) {
						callback(null)
					} else {
						callback(Error('Email and Password does not match'))
					}
				} else {
					callback(Error("Email Does not exist"))
				}
			}

		})
	},
}
