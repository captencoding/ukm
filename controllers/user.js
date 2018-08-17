const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saltRounds = 10

module.exports = {
    signup(req, res){
            bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
        return User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        }).then(newUser => {
            res.json({
                "status":"success",
                "message":"User created!",
                "data": newUser
            })
    })
    .catch(err => res.send (err))
}
            )}
            )
    },
    authenticate: (req, res, next) => {
        userModel.findOne({
            email: req.body.email
        }, (err, userInfo) => {
            if(err) {
                next(err)
            }
            else {
                if(bcrypt.compareSync(req.body.password, userInfo.password)){
                    const token = jwt.sign({id: userInfo._id}, 
                    req.app.get('impactbyte'), {expiresIn: '1h'})

                    res.json({status: 'OK!', message: 'Success', data: {user: userInfo, token: token}})
                }
                else{
                    res.json({status: 'Error', message: 'invalid email or password', data: 'access denied!'})
                }
            }
        })
    }
}