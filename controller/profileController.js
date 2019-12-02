const db = require("../model/message")





module.exports = {
    displayUserProfile: (req, res) => {
        console.log("req.session.user")
        const userDetail = req.session.userDetails
        
        // req.session.email = null;
        // req.session.user = null;
        // req.session.token = null;
		 return res.render('userprofile', { userDetails: userDetail, userprofileCSS: true});
	}

   
}