module.exports = {

	getUserDetails: (req,callback) => {
		const email = req.session.email

		req.con.query(`SELECT * FROM user WHERE name=?`, [email], (err, results) => {
			if (err) {
				callback(Error('Error from Database'))
			} else {
				callback(null, results)
			}
		})
  }
}