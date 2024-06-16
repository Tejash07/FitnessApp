const User = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { Mongoose } = require('mongoose')



const register = async (req,res,next) => {

    User.findOne({name:req.body.name}).then( user => {

        console.log(user)

        if(user){

            res.json({message: "Account Already Exists",
            info: req.body})
        }
        //console.log(User.findOne({name:req.body.name}))
        else{


            bcrypt.hash(req.body.password, 10, function(err, hashedPass){
                if(err){
                    res.json({error:'Error Logging In'})
                }
        
                let user = new User({
                    name: req.body.name,
                    email: 'req.body.email',
                    password: hashedPass,
                    premium: false,
                    workouts:[]
                }) 
            
                user.save().then(user => {
                    res.json(user)
                }).catch(error => {
                    res.json({
                        message: "Error creating user"
                    })
                })
            })
        }

            
    })

  
}


const login = (req,res,next) =>{

    let username = req.body.name
    let password = req.body.password

    User.findOne({name:username}).then(
        user => {
            if(user){
                
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.name}, 'SecretValue', {expiresIn: '1h'})
                        
                        res.json(user)
                    }   
                    else{
                        res.json({message:"Incorrect Password"})
                    }
                })
            }
            else{
         
                
                res.json({error:"Not User Found"})
                console.log(req.body)
            }
        }
    )

}

module.exports = {
    login,
    register
}