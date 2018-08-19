const { Product } = require('../models')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    validateUser(req, res, next){
        jwt.verify(req.headers['x-access-token'],'Secretbanget', (err, decoded) => {
        if(err){
            next(err,'Token Expired!!')
        }
        else {
            req.body.UserId = decoded.id
            next()
        }
    })
    },
    addProduct(req, res){
        return Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        }).then(newProduct => {
            res.json({
                'status':'success',
                'message':'Product created!',
                'data': newProduct
            })
        }).catch( err => res.send (err))
    },
    getProduct(req, res){
        Product.findAll().then(products => {
            res.json(products)
        })
    }
}

