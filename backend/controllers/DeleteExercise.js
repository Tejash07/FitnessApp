//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const deleteExercise = async (req,res,data) =>{


//Create an area in database for recent workouts so you don't have to loop through all of them
//Or just find a way to not use a for loop to delete or update a workout

let workouts;

User.findOne({name:req.body.name}).then( (user) => {

    workouts = user.workouts
  
    let i, j;
    for(i = 0; i < user.workouts.length; i++){
     
        if(workouts[i]._id == req.body.workoutID){

            for(j = 0; j < workouts[i].exercises.length; j++){
                if(workouts[i].exercises[j].ID === req.body.exerciseID){
                    workouts[i].exercises.splice(j, 1)
                }
            }
         
     
            
           
        }
    }

    User.updateOne({name: req.body.name},{workouts:workouts}).then( err => {console.log(err)})
   

    res.json(user.workouts)
   //res.json(workouts)
})

 


}


module.exports = {
  deleteExercise
}