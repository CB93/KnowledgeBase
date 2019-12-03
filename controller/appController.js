const db = require("../model/app");
const dbMessage = require("../model/message");

module.exports = {

	landing: (req, res) => {
		req.session.pagination = 0;

		db.getUserDetails(req, (err, userDetails) => {
			if (err) throw err;
			else {
				const userDetail = userDetails[0]
				console.log(userDetails)
				return res.render('landing', { user: userDetail, landingCSS: true })
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

	profile: (req,res) => {
		return res.render('userprofile', {user: req.params.id})
	},


	messaging: async (req, res) => {
		return res.render('messaging', { messagingCSS: true });
	}
}
