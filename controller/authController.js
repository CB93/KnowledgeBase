const db = require("../model/auth");
const jwt = require("jsonwebtoken");

module.exports = {

    index: (req, res) => {
        req.session.email = null;
        req.session.user = null;
        req.session.token = null;
		return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: req.query.error, login: true });
	},

	login: (req, res) => {
		db.getUser(req, (err,user) => {
            if (err) return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: err.message, login: true });

            const token = jwt.sign({user: user[0].iduser, name: user[0].name}, process.env.JWT_SECRET);
            req.session.email = user[0].name;
            req.session.userId = user[0].iduser;
            req.session.token = token;
            req.session.pagination = 0;
			return res.redirect('/landing')
		})
	},

	register: (req, res) => {

		//Submitted from /register page
		const firstName = req.body.firstName
		const lastName = req.body.lastName
		const email = req.body.email
		const password = req.body.password
		const confirmPassword = req.body.confirmPassword

		if (password != confirmPassword) {
			return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: 'Password must match your confirm password', login: true })
		}

		db.emailCheck(req, (err, user) => {
			if (err) throw err
			if (user.length > 0) {
				return res.render('register', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', registerCSS: true, validation: "User already exists", login: true })
			} else {
				if (email && firstName && lastName && password) {
					req.session.email = email;
					req.session.firstName = firstName;
					req.session.lastName = lastName;
					req.session.password = password;
					return res.redirect('/about')
				}

			}
		})

		//Submitted from /about page
		const country = req.body.country;
		
		//Stores data submitted from /about page
		if (typeof country != 'undefined') {
			db.registerUser(req, (err, user) => {
				if (err) {
					console.log('Error from Database')
					throw err
				}
				else {
					return res.redirect('/landing')
				}
			})
		}
	},

	about: (req, res) => {
		return res.render('about', { pageTitle: 'People App', heading: 'Tell us a bit more about yourself', aboutCSS: true, login: true })
	},
}
