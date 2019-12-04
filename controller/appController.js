const db = require("../model/app");

module.exports = {

	landing: (req, res) => {
		req.session.pagination = 0;

		db.getUserDetails(req, (err, userDetails) => {
			if (err) throw err;
			else {

				req.session.userDetails = userDetails[0]
				const userDetail = userDetails[0]

				return res.render('landing', { user: userDetail, landingCSS: true , landing: true})
			}
		})
	},

	editProfile: (req, res) => {
		db.editProfile(req, (err) => {
			if (err) throw err;
			else {
				return res.redirect('/landing')
			}
		})
	},

	profile: (req, res) => {
		db.fetchProfileDetails(req, (err,results) => {
			if (err) throw err;
			else {
			return res.render('userprofile', { user: results, userDetails:results[0], userprofileCSS: true })
			}
		})
	},

	messaging: async (req, res) => {
		return res.render('messaging', { messagingCSS: true });
	}
}
