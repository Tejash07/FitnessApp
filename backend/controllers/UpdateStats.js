//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const updateStats = async (req,res,data) =>{

let workouts;

User.findOne({name:req.body.name}).then( (user) => {


   let exerciseStats = user.exerciseStats;
   console.log(exerciseStats)

    let i;
    let nameExists = false;

    
 
    if(exerciseStats.length === 0){
        exerciseStats.push({exerciseName: req.body.exerciseInfo.exerciseName, sets:{
            setList: req.body.exerciseInfo.sets,
            date: req.body.exerciseInfo.date
        }})
    }

    else{
        for(i = 0; i < exerciseStats.length; i++){

            
            console.log(req.body.exerciseInfo)
            if(exerciseStats[i].exerciseName === req.body.exerciseInfo.exerciseName){
                console.log(req.body.exerciseInfo.date)
                console.log(exerciseStats[i].date)
                if(req.body.exerciseInfo.date === exerciseStats[i].date){

                    exerciseStats[i].sets = {setList:req.body.exerciseInfo.sets, date: req.body.exerciseInfo.date}
                   
                }

                else{
                    //exerciseStats.push({setList:req.body.exerciseInfo.sets, date: req.body.exerciseInfo.date})
                }
                
               
                console.log("IT EXSISTS")
                nameExists = true;
                break;
            }
        }

        if(nameExists === false){
            let exerciseObject = {}
            exerciseStats.push({exerciseName: req.body.exerciseInfo.exerciseName, sets:{
                setList: req.body.exerciseInfo.sets,
                date: req.body.exerciseInfo.date
            }});
        }
    }



 


    




    User.updateOne({name: req.body.name},{exerciseStats:exerciseStats}).then( err => {console.log(err)})


   res.json(user.exerciseStats)

})

 


}


module.exports = {
   updateStats
}