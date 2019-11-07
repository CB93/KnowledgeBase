module.exports = {

	getUser: (req, callback) => {
		const username = req.body.username
		const password = req.body.password
		console.log(password)
		req.con.query(`SELECT * FROM user WHERE name='${username}'`, (err, rows, fields) => {
			console.log(rows)
			if (rows.length !== 1) {
				callback(false)

			} else {

				callback(rows[0].password == password)
			}

		})
	},

}


