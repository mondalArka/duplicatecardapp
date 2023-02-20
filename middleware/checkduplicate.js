let userss = require('../model/usermodel')
exports.checkdataentries = (req, res, next) => {
    userss.findOne({
        name: req.body.name
    }).exec((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        if (data) {
            req.flash('message', "Username alreday exist")
            req.flash("alert","alert-danger")
            return res.redirect('/add')
        }

        userss.findOne({
            email: req.body.email
        }).exec((err, data) => {
            if (err) {
                console.log(err);
                return
            }
            if (data) {
                req.flash('message', "Email already exist")
                req.flash("alert","alert-danger")
                return res.redirect("/add")
            }
            next()
        })


    })


}