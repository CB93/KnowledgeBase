const db = require("../model/auth")

module.exports = {

	index: (req, res) => {
		return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: req.query.error });
	},

	login: (req, res) => {
		db.getUser(req, (err) => {
			if (err) return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: err.message });
			return res.redirect('/landing')
		})
	},

	register: (req, res) => {

		const password = req.body.password
		const confirmPassword = req.body.confirmPassword

		if (password != confirmPassword) {
			return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: 'Password must match your confirm password' })
		}

		db.emailCheck(req, (err, user) => {
			if (err) throw err
			if (user.length > 0) {
				return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: "User already exists" })
			} else {

				db.registerUser(req, (err, user) => {
					if (err) throw err
					return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: "Account Created, you may sign in" })
				})
			}

		})
	}
}