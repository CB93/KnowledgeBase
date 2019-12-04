const db = require("../model/app");

module.exports = {
	
	landing: (req, res) => {
		let userDetail = '';

		req.session.pagination = 0;
		db.getUserDetails(req, (err, userDetails) => {
			if (err) throw err;
			else {
				
				req.session.userDetails = userDetails[0]
				userDetail = userDetails[0]
				
				// return res.render('landing', { user: userDetail, landingCSS: true , landing: true, searchByTopicCSS:true})
			}
		})

		

		db.countUserPosts(req, (err, results) => {
			if (err) throw err;
			else {
				req.session.postCount = results[0].n
			}
		})
		db.countUserMessages(req, (err, results) => {
			if (err) throw err;
			else {
				console.log('results' , results[0]);
				const userDetail = req.session.userDetails
				const postCount = req.session.postCount
				const messageCount = results[0].numberofmessages;
				
				 return res.render('landing', { messageCount:messageCount, user: userDetail, numberOfPosts: postCount, landingCSS: true , landing: true, searchByTopicCSS:true})
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
				console.log(results[0])
			return res.render('userprofile', { user: results, userDetails:results[0], userprofileCSS: true })
			}
		})
	},

	messaging: async (req, res) => {
		return res.render('messaging', { messagingCSS: true });
	}
}
