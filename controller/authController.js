const db = require("../model/auth")



module.exports = {

	index: (req, res) => {
		return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: req.query.error, login: true});
	},

	login: (req, res) => {
		db.getUser(req, (err) => {
			if (err) return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: err.message, login: true });
			req.session.email = req.body.username
			//return res.redirect('/landing')
			return res.redirect('/profile')
		})
	},

	register: (req, res) => {
		//Post from  main Page	
		const firstName = req.body.firstName
		const lastName = req.body.lastName
		const userName = req.body.username
	//	 const emailId = req.body.emailId
		const password = req.body.password
		const confirmPassword = req.body.confirmPassword
		
		//Post from "/about" page
		const country = req.body.country;
		const imageUrl = req.body.url
		const linesAboutYourself = req.body.lines
		const birthday = req.body.birthday		

		if (password != confirmPassword) {
			return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: 'Password must match your confirm password',login: true })
		}

		db.emailCheck(req, (err, user) => {
			if (err) throw err
			if (user.length > 0) {
				return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: "User already exists", login: true })
			} else {
				if(userName && firstName && lastName && password) {
					req.session.email = userName;
					req.session.firstName = firstName;
					req.session.lastName = lastName;
					req.session.password = password;					
					return res.redirect('/about')	
				 }
				 
			}
		})
		//Store Post from /about page to database
		if(typeof country != 'undefined' ) {
			db.registerUser(req, (err, user) => {
				if (err) {
					console.log('DB Err')
					throw err
				}
				else {
				return res.redirect('/profile')
				}
			})
		}
	},

	about: (req,res) => {
		return res.render('about', { pageTitle: 'People App', heading: 'Tell us a bit more about yourself', aboutCSS: true, login: true })
	},

	


}
