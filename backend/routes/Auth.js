const express = require('express')
const router = express.Router()


const AuthController = require('../controllers/Auth')
const WorkoutController = require('../controllers/AddWorkout')
const getWorkoutsController = require('../controllers/GetWorkouts')
const DeleteWorkoutController = require('../controllers/DeleteWorkout')
const AddExerciseController = require('../controllers/AddExercise');
const AddSetController = require('../controllers/AddSet');
const DeleteExerciseController = require('../controllers/DeleteExercise')
const AddTemplateController = require('../controllers/AddTemplate');
const UpdateTemplateController = require('../controllers/UpdateTemplate')
const UpdateStatsController = require('../controllers/UpdateStats')
const GetTemplatesController = require('../controllers/GetTemplates')
const DeleteTemplatesController = require('../controllers/DeleteTemplate')

router.post('/deleteWorkout', DeleteWorkoutController.deleteWorkout)


router.post('/getWorkouts', getWorkoutsController.getWorkouts)

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.post('/addworkout', WorkoutController.addWorkout)
router.post('/addExercise', AddExerciseController.addExercise)
router.post('/addSet', AddSetController.addSet)


router.post('/deleteExercise', DeleteExerciseController.deleteExercise)

router.post('/addTemplate', AddTemplateController.addTemplate)
router.post('/getTemplates', GetTemplatesController.getTemplates)
router.post('/deleteTemplate', DeleteTemplatesController.deleteTemplate)

router.post('/updateTemplate', UpdateTemplateController.updateTemplate)

router.post('/updateStats', UpdateStatsController.updateStats)


module.exports = router