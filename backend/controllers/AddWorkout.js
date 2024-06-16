//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const addWorkout = async (req,res,data) =>{
    
    let workouts;


    User.findOne({name:req.body.name}).then( user => {

        

        if(user.workouts === null){
            workouts = []
        }
        else{
            workouts = user.workouts;
        }

        

     
       //console.log(workouts)
   

        let workout = {
            title: req.body.workoutData.title,
            exercises: req.body.workoutData.exercises
         }

         //console.log(workout)


       workouts.push(workout)

      // console.log(workouts)

         

        User.updateOne({
        name: req.body.name
    },{
        workouts:workouts
    }).then((err => {console.log(err)}))
    
    res.json(workouts)
     
    console.log("Workout Added")




    })




    



}


module.exports = {
   addWorkout
}