module.exports = {

	landing: (req, res) => {
		return res.render('landing', { pageTitle: 'home', heading: 'Welcome to KnowledgeBase', landingCSS: true });
	},

}