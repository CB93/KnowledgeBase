module.exports = {

	getUser: (req, callback) => {
		const username = req.body.username
		const password = req.body.password

		req.con.query(`SELECT * FROM user WHERE name='${username}'`, (err, rows, fields) => {

			if (rows.length !== 1) {
				callback(false)

			} else {

				callback(rows[0].password == password)
			}

		})
	},

}


