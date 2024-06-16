//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const getTemplates = async (req,res,data) =>{
    User.findOne({name:req.body.name}).then((user) => {
        res.json(user.templates)
    })
}


module.exports = {
   getTemplates
}