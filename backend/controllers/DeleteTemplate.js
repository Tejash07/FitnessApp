//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const deleteTemplate = async (req,res,data) =>{


//Create an area in database for recent workouts so you don't have to loop through all of them
//Or just find a way to not use a for loop to delete or update a workout

User.findOne({name:req.body.name}).then( (user) => {

  let templates = user.templates
  console.log(templates)
    let i, j;
    for(i = 0; i < templates.length; i++){
        if(templates[i].id === req.body.templateID  ){
            templates.splice(i , 1)
        }
    }

    

    User.updateOne({name: req.body.name},{templates:templates}).then( err => {console.log(err)})
   

    res.json(user.templates)

    console.log('Template Deleted')
  
})

 


}


module.exports = {
  deleteTemplate
}