//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const addTemplate = async (req,res,data) =>{



    let templates = []

   

    

   User.findOne({name:req.body.name}).then(( res2) =>{
        

        let templateExist = false;
        templates = res2.templates;


        let i;
        for(i = 0; i < templates.length; i++){
            
            if(templates[i].title == req.body.templateName){
               templateExist = true  
            }
        }

        if(templateExist){
            res.json({
                message: "That Template Already Exists!"
            })
            
        }

        else{

            let i;
           
            let templateExercises = req.body.exercises;
      

            let template = {
                templateName: req.body.templateName,
                exercises:templateExercises,
                templateData: [],
                id: 'Template#'+Math.floor((Math.random() * 5000)* Math.random() * 5000)
             }
    
            templates.push(template)
           

           User.updateOne({
                name: req.body.name
            },{
                templates:templates
            }).then(err =>{console.log(err)})
            
            res.json(templates)
             
            console.log("Template Added")
        }
      
        

    })


}


module.exports = {
   addTemplate
}