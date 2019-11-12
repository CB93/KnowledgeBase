const db = require("../model/post")

module.exports = {

    post: (req, res) => {
        db.post(req, (err) => {
            //TODO --- handle error later
            res.redirect("/landing");
        });
    },

}
