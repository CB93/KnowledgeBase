const db = require("../model/Knowledgebase")

module.exports = {

	index: (req, res) => {
		return res.render('login', { pageTitle: 'People App', heading: 'Welcome to People App', loginCSS: true });
	},

	login: (req, res) => {
		db.getUser(req, data => {
			if (data) return res.redirect('/landing')
			return res.render('login', { pageTitle: 'People App', heading: 'Welcome to People App', validation: 'incorrect validation', loginCSS: true })
		})
	},

}