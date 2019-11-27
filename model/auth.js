module.exports = {

	getUser: (req, callback) => {

		const email = req.body.email
		const password = req.body.password

		req.con.query(`SELECT * FROM user WHERE name=?`, [email], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				if (results.length > 0) {
					if (results[0].password == password) {
						callback(null, results)
					} else {
						callback(Error('Username and Password does not match'))
					}
				} else {
					callback(Error("Username Does not exist"))
				}
			}
		})
	},

	emailCheck: (req, callback) => {
		req.con.query(`SELECT * FROM user WHERE name=?`, [req.body.email], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null, results)
			}
		})
	},

	registerUser: (req, callback) => {
		// userId is auto incremented in DB
		const newUser = {
			name: req.session.email,
			password: req.session.password,
			firstname: req.session.firstName,
			lastname: req.session.lastName,
			country: req.body.country,
			about: req.body.about,
			imageurl: req.body.url,
			birthday: req.body.birthday
		}

		req.con.query(`Insert INTO user SET ?`, [newUser], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null)

			}
		})
	},
}
