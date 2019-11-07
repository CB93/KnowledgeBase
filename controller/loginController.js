const db = require("../model/Knowledgebase")

module.exports = {

	index: (req, res) => {
		return res.render('login', { pageTitle: 'People App', heading: 'Welcome to People App', loginCSS: true });
	},

	login: (req, res) => {
		db.getUser(req, (err) => {
			if (err) return res.render('login', { pageTitle: 'People App', heading: 'Welcome to People App', validation: err.message, loginCSS: true })
			return res.redirect('/landing')
		})
	},

}	



// login: (req, res) => {
// 	db.getUser(req, (err, data) => {
// 		if (data) 
// 		return res.render('login', { pageTitle: 'People App', heading: 'Welcome to People App', validation: 'incorrect validation', loginCSS: true })
// 	})
// },