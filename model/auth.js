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
		/*
		SINCE idUser Column is set to auto increment, we dont need randomId 
		*/
		//const randomID = new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
		const newUser =  {/*iduser: randomID ,*/ 
			name: req.session.email, 
			password: req.session.password,
			firstname: req.session.firstName,
			lastname: req.session.lastName,
			country: req.body.country,
			lines: req.body.lines,
			imageurl: req.body.url,
			birthday: req.body.birthday
			}

		console.log('New User', newUser)
		req.con.query(`Insert INTO user SET ?`, [newUser], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				console.log("Data Saved Successfully")
				callback(null)
				
			}
		})
	},
	
	getUserDetails: (req,callback) => {
		const email = req.session.email
		console.log("Req Session Email ", email)

		req.con.query(`SELECT * FROM user WHERE name=?`, [email], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				console.log("Result ",results)
				callback(null, results)
				
			}
		})
	}
}
