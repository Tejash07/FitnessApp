//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const updateTemplate = async (req,res,data) =>{



    let templates = []

   

    

   User.findOne({name:req.body.name}).then(( User) =>{
        
        let templateExist = false;

        //Workout Data will consist of all the exercises, sets, and the date in which the workout was created.

        let workoutData = req.body.workoutData;
        let templateName = req.body.templateName;
        let templatePosition;




        let i;
        for(i = 0; i < User.templates.length; i++){
            if(templateName === User.templates[i].templateName){
                templateExist = true;
                templatePosition = i;
            }
        }


        if(templateExist){

            let templateInfo = User.templates;
            templateInfo[templatePositon].templateData = workoutData

          

           
        }


        /* 
            [

                {
                    date: 'april 12th, 2021
                    exercises: []
                }






            ]

        
        
        
        
        
        
        */





        User.updateOne({name: req.body.name},{templates:templateInfo}).then( err => {console.log(err)})


        res.json(user.exerciseStats)

    
    })


}


module.exports = {
   updateTemplate
}