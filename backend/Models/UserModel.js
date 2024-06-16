const mongoose = require('mongoose')



const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },

    exercises:{
        type: Array,
        required: true,

    }
})



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    },

    premium: {
        type: Boolean,
        required: true,
        default: false
    },

    workouts:{
        
        type: [workoutSchema],
        required: true,
        default: []
    },

    templates:{
        type: Array,
        required: true,
        default: []
    },
    exerciseStats:{
        type: Array,
        required: true,
        default: []
    }

    
})





module.exports = mongoose.model('User', userSchema), mongoose.model('Workout', workoutSchema)
    




