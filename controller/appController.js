const db = require("../model/app");
const dbMessage = require("../model/message");

module.exports = {

	landing: (req, res) => {

		db.getUserDetails(req, (err, userDetails) => {
			if (err) throw err;
			else {
				const userDetail = userDetails[0]
				console.log(userDetails)
				return res.render('landing', { user: userDetail, landingCSS: true })
			}
		})
	},
	// userProfile:(req,res) => {

	// 	db.getUserDetails(req, (err, userDetails) => {
	// 		if (err) throw err;
	// 		else {
	// 		const email = userDetails[0].name
	// 		const firstName = userDetails[0].firstname
	// 		const lastName = userDetails[0].lastname
	// 		const about = userDetails[0].lines
	// 		const imageUrl = userDetails[0].imageurl

	// 		return res.render('userprofile', {
	// 			email: email,
	// 			firstName: firstName,
	// 			lastName:lastName,
	// 			about: about,
	// 			imageUrl:imageUrl
	// 			})
	// 		}
	// 	})
    //},

    messaging: async (req, res) => {
        return res.render('messaging', {messagingCSS: true});
    }
}
