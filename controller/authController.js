const db = require("../model/Knowledgebase")

module.exports = {

	index: (req, res) => {
		return res.render('login', { pageTitle: 'People App', heading: 'Welcome to KnowledgeBase', loginCSS: true, validation: req.query.error });
	},

	login: (req, res) => {
		db.getUser(req, (err) => {
			if (err) return res.redirect(`/?error=${err.message}`)
			return res.redirect('/landing')
		})
	},

	register: (req, res) => {
		console.log(req.body)
	}
}

