import React, {useState, useEffect} from 'react';
import "./WorkoutView.css"
import axios from "axios"
import Exercise from "../Exercise/Exercise"
import ExerciseMenu from "../ExerciseMenu/ExerciseMenu"
import SettingsModal from "../SettingsModal/SettingsModal"
import Timer from 'react-compound-timer'

const WorkoutView = (props) => {


    
    const [workoutData, setWorkoutData] = useState(props.data)
    const [exerciseMenu, setExerciseMenu] = useState(0)
    const [exercisesList, setExercisesList] = useState([])
    const [settingsView, setSettingsView] = useState(false)
    const [workoutVolume, setWorkoutVolume] = useState(0);
    const [restTimeState, setRestTimeState] = useState('play')
    const [durationState, setDurationState] = useState('play')
    



    const [updater,setUpdater] = useState(0)

    useEffect(() => {
        let theView = document.querySelector('.workout-view-container');
        theView.style.opacity = 1;


        if(props.data != null){
            setExercisesList(props.data.exercises)
            calculateVolume()
        }
    }, [])

 


    function renderSettingsView(){
        if(settingsView){
            return(<SettingsModal deleteWorkout={deleteWorkout} saveTemplate={saveTemplate}/>)
        }
    }

    function renderExerciseMenu(){
        if(exerciseMenu === 1){
            return(<ExerciseMenu updateTemplate={updateTemplate} closeMenu={setExerciseMenu} updater={updater} setUpdater={setUpdater} updateWorkoutList={props.updateWorkoutList} updateExerciseList={updateExerciseList} exercises={exercisesList} connection={props.connection} userData={props.userData} data={workoutData}/>)
        }
    }

    function updateExerciseList(data){
        setExercisesList(data)
    }



    function createWorkout(){
        let postObject;
        let workoutTitle = document.querySelector('.workout-title-input').value;
        postObject = {
            name: props.userData.name,
            workoutData:{ 
                title: workoutTitle,
                exercises:[]
            },
        }
        axios.post(props.connection + 'user/addWorkout', postObject).then((res) => {
            console.log(res)
            props.updateWorkouts(res.data)
        })
        console.log(props.connection + 'user/addWorkout')
        props.closeView(0)
       
    }

    function deleteWorkout(){

        let postObject;
        postObject = {
            name: props.userData.name,
            workoutID:props.data._id}

        axios.post(props.connection + 'user/deleteWorkout', postObject).then((res) => {
            console.log(res)
            props.updateWorkouts(res.data)
        })
        props.closeView(0)

    }


    function saveTemplate(){

        let i;
        let templateName = props.data.title;
        let templateExists = false;
  
        for(i = 0; i < props.templatesList.length; i++){
            if(props.templatesList[i].templateName === templateName){
                console.log("Template With That Name Already Exists");
                templateExists = true;
                break;
            }
        }

        if(templateExists === false){
            let noSetExerciseList = []
            for(i = 0; i < exercisesList.length; i++){
                let exerciseObject = {
                    name: exercisesList[i].name,
                    type: exercisesList[i].type,
                    category: exercisesList[i].category
                }
                noSetExerciseList.push(exerciseObject)
            }
            let postObject = {
                name: props.userData.name,
                templateName: templateName,
                exercises: noSetExerciseList,
            }
            axios.post(props.connection + 'user/addTemplate', postObject).then((res) => {
                console.log(res)
                props.setTemplatesList(res.data)
            })
            //props.closeMenu(false)
            console.log(postObject)
        }


       
    }


    function updateTemplate(){

        let postObject = {
            name: props.userData.name,
            templateName: props.data.title,
            workoutData: workoutData.exercises,
            date: props.data.dateCreated
        }


        console.log(postObject)





      /*  axios.post(props.connection + 'user/updateTemplate', postObject).then((res) =>{
            console.log(res)
        })*/

    }

    function calculateVolume(){
        let theExercises;

        if(exercisesList.length === 0){
            theExercises = props.data.exercises
        }

        else{theExercises = exercisesList;}


        

        let i, j;
        let totalVolume = 0;

        for(i = 0; i < theExercises.length; i++){
            for(j = 0; j < theExercises[i].sets.length; j++){
                totalVolume += (theExercises[i].sets[j].weight * theExercises[i].sets[j].reps)
            }
        }
        setWorkoutVolume(totalVolume)

        console.log(exercisesList)

    }

    function renderPlayState(){
        if(restTimeState === 'play'){
            return(<i class="fas fa-play-circle"></i>)
        }
        else {
            return(<i class="fas fa-pause-circle"></i>)
        }
    }

    
    function renderDurationState(){
        if(durationState === 'play'){
            return(<i class="fas fa-play-circle"></i>)
        }
        else {
            return(<i class="fas fa-pause-circle"></i>)
        }
    }





    if(props.data != null){


        return(<div className="workout-view-container">
        <div className="workout-view-wrapper">
            {renderSettingsView()}
            {renderExerciseMenu()}
            <div className="workout-exercises-container">
                <div className="workout-view-stats-container">
                    <div className="stat-block-container"><span className="stat-block-text center-all">Volume: {workoutVolume}</span></div>
                    <div className="stat-block-container"><span className="stat-block-text center-all">Exercises: {exercisesList.length}</span></div>
                    <div className="stat-block-container rest-timer"><span className="stat-block-text center-all">Rest Time: <span className="time-holder">
                    <Timer initialTime={200000}
                    startImmediately={false} direction="backward">
                        {({start, resume, pause, stop, reset}) => (
                            <React.Fragment>
                                <Timer.Minutes />:
                                <Timer.Seconds />
                                <span className="timer-controller" onClick={() => { 
                                        if(restTimeState === 'play')
                                        {start(); setRestTimeState('pause')}  
                                        else if(restTimeState === 'pause'){
                                            pause();
                                            setRestTimeState('play')
                                        }
                                    }}>
                                    {renderPlayState()}
                                </span>
                              
                           
                
                            <i class="fas fa-redo-alt" onClick={reset}></i>
                            </React.Fragment>
                        )}
                </Timer>
                </span>  
                </span>
            </div>
                    <div className="stat-block-container"><span className="stat-block-text center-all">Duration:  
                    <Timer initialTime={0}
                    direction="forward">
                        {({start, resume, pause, stop, reset}) => (
                            <React.Fragment>
                                <Timer.Minutes />:
                                <Timer.Seconds />
                                <span className="timer-controller" onClick={() => { 
                                        if(durationState === 'play')
                                        {start(); setDurationState('pause')}  
                                        else if(durationState === 'pause'){
                                            pause();
                                            setDurationState('play')
                                        }
                                    }}>
                                    {renderDurationState()}
                                </span>
                              
                           
                
                            
                            </React.Fragment>
                        )}
                </Timer>  </span></div>
                </div>
                <div className="workout-view-header">
            
           <button className="close-workout-view-button" onClick={() => {props.closeView(0); props.updateWorkoutList()}}><i class="fas fa-arrow-circle-left"></i>Back</button>
            </div>
          
                <div className="workout-exercises-wrapper">
                <div className="workout-view-title">{workoutData.title} <div className="settings-button" onClick={() => {setSettingsView(true)}}><i class="fas fa-cog center-all"></i></div></div>
                    <button className="add-exercise-button" onClick={() => {setExerciseMenu(1)}}>Add Exercise +</button>
                    <div className="workout-view-exercise-list-wrapper">
                        {exercisesList.map((exercise) => <Exercise workoutVolume={workoutVolume} setWorkoutVolume={setWorkoutVolume} calculateVolume={calculateVolume} setExercisesList={setExercisesList} setUpdater={setUpdater} updater={updater} connection={props.connection} data={exercise} workoutData={props.data} userData={props.userData}/>)}

                    </div>

                </div>
            </div>
        </div>
    </div>)
    }

    else{
        return(<div className="workout-view-container">
        <div className="workout-view-wrapper">
           
            {renderExerciseMenu()}
           <button className="close-workout-view-button" onClick={() => {props.closeView(0)}}>Close</button>
            <div className="workout-chart-container">
            </div>
            <div className="workout-exercises-container">
                <div className="workout-exercises-wrapper">
                <div><input className="workout-title-input" placeholder="Enter Workout Title"/><button onClick={createWorkout}>Submit</button></div>
                    <button className="add-exercise-button" onClick={() => {setExerciseMenu(1)}}>Add Exercise</button>
                  

                </div>
            </div>
        </div>
    </div>)
    }

   



    
}
 
export default WorkoutView;