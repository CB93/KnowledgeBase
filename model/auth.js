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
						callback(Error('Username and Password does not match'))
					}
				} else {
					callback(Error("Username Does not exist"))
				}
			}
		})
	},


	emailCheck: (req, callback) => {
		req.con.query(`SELECT * FROM user WHERE name=?`, [req.body.username], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null,results)
			}
		})
	},

	registerUser: (req, callback) => {
		const randomID = new Date().getTime().toString(36) + Math.random().toString(36).slice(2)

		const newUser =  {iduser: randomID , name: req.body.username, 
			password: req.body.password,
			firstname: req.body.firstName,
			lastname: req.body.lastName }

		req.con.query(`Insert INTO user SET ?`, [newUser], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null,results)
			}


		})
	}

}
