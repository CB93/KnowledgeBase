module.exports = {


	getUserDetails: (req, callback) => {
		const email = req.session.email

		req.con.query(`SELECT * FROM user WHERE name=?`, [email], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null, results)
			}
		})
	},

	fetchProfileDetails: (req, callback) => {
		const userId = req.params.id 
		req.con.query(`SELECT * FROM user WHERE iduser=?`, [userId], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null, results)
			}
		})
	},

	editProfile: (req, callback) => {
		Object.keys(req.body).forEach(k => (!req.body[k] && req.body[k] !== undefined) && delete req.body[k]);
		const userId = req.session.userId;

		req.con.query(`Update user SET ? WHERE iduser = ${userId} `, [req.body], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null)
			}
		})

	}
}