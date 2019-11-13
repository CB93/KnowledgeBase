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

	registerUser: (req, callback) => {
		req.con.query(`SELECT * FROM user WHERE name=?`, [username], (err, results) => {
			if(err) {
				callback(Error('Error from Database'))
			} else {
				if(!results.length) {
					
				} else {
					callback(Error('Username already Exists'))
				}
			}
		})
	}
}
