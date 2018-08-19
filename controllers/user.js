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
    authenticate(req, res, next) {
        const { email, password } = req.body
        if (email && password){
            User.findOne({where:{email}}).then(user => {
                bcrypt.compare(password, user.password).then(result => {
                    if(result){
                        console.log('okey benar');
                        const token = jwt.sign({id: user.id}, 'Secretbanget', { expiresIn: '1h' })
                        res.json({status:"success", message: "user found!!!", data:{user: user, token:token}})
                    }else {
                        res.json({status:"error", message: "Invalid email/password!!!"});
                    }
                })
            })
        }
        
       },
}
