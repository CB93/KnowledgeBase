const db = require("../model/auth")

module.exports = {

	landing: (req, res) => {
		return res.render('landing', { pageTitle: 'home', heading: 'Welcome to KnowledgeBase', landingCSS: true });
	},
	userProfile:(req,res) => {
		
		db.getUserDetails(req, (err, userDetails) => {
			//if (err) return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: err.message, login: true });
			if (err) throw err;
			else {
			const email = userDetails[0].name
			const firstName = userDetails[0].firstname
			const lastName = userDetails[0].lastname
			const about = userDetails[0].lines
			const imageUrl = userDetails[0].imageurl
			
			console.log("userDetails.email ", firstName)
			//return res.redirect('/landing')
			return res.render('userprofile', {
				email: email,
				firstName: firstName,
				lastName:lastName,
				about: about,
				imageUrl:imageUrl
				})
			}
		})

	}
}