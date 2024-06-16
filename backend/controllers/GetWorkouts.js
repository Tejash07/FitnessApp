//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const getWorkouts = async (req,res,data) =>{


   

    User.findOne({name:req.body.name}).then((user) => {

        console.log(req.body)
        res.json(user.workouts)
 
    })
}


module.exports = {
   getWorkouts
}