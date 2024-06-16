import React, {useState, useEffect} from 'react';
import "./WorkoutsPage.css"
import WorkoutCard from "../WorkoutCard/WorkoutCard"
import LineChart from "../LineChart/LineChart"
import WorkoutView from "../WorkoutView/WorkoutView"
import TemplateCard from "../TemplateCard/TemplateCard"
import ExerciseMenu from "../ExerciseMenu/ExerciseMenu"
import axios from "axios"

import { Line } from '@nivo/line';


const WorkoutsPage = (props) => {


    const [workoutView, setWorkoutView] = useState(0);
    const [workoutViewData, setWorkoutViewData] = useState()
    const [workoutsList, setWorkoutsList] = useState([]);
    const [templatesList, setTemplatesList] = useState([])
    const [chartData, setChartData] = useState();
    const [templateCreation, setTemplateCreation] = useState(false)

  


    //console.log(workoutsList)

    useEffect(() => {
        setTimeout(() => {
            if(props.data.name != null){
                axios.post(props.connection + 'user/getWorkouts', {name: props.data.name}).then((res) => {
                    console.log(res)
                    if(props.data.workouts !== null){
                        setWorkoutsList(props.data.workouts.reverse())
                    }
                })

                axios.post(props.connection + 'user/getTemplates', {name: props.data.name}).then((res) => {
                    console.log(res)
                    if(props.data.templates !== null){
                        setTemplatesList(props.data.templates)
                    }
                })
            }
            else{
                console.log('Something is wrong')
            }
        }, 100);
    }, [])
    

    function updateWorkoutList(){
            axios.post(props.connection + 'user/getWorkouts', {name: props.data.name}).then((res) => {
                console.log(res)
                    setWorkoutsList(res.data.reverse())
            })
    }

    function renderWorkoutView(){

        if(workoutView === 1){
            return(<WorkoutView setTemplatesList={setTemplatesList} templatesList={templatesList} updateWorkoutList={updateWorkoutList} updateWorkouts={setWorkoutsList} closeView={setWorkoutView} connection={props.connection} userData={props.data} data={workoutViewData}/>)
        }
        else{
            return ('')
        }
    }


    function calculateChartData(){

        let theChartData = []
        let i, j, k;
        for(i = 0; i < workoutsList.length; i++){
          let dailyVolume = 0;
          for(j = 0; j < workoutsList[i].exercises.length; j++){
            for(k = 0; k < workoutsList[i].exercises[j].sets.length; k++){
              dailyVolume += (workoutsList[i].exercises[j].sets[k].reps * workoutsList[i].exercises[j].sets[k].weight);
            }
          }
          let dataPoint = { 
            x: workoutsList[i].dateCreated,
            y: dailyVolume
          }
         theChartData.push(dataPoint)
        }
        return(theChartData)
    }



    function renderTemplateCreation(){

        if(templateCreation){
            return(
                <ExerciseMenu setTemplatesList={setTemplatesList} template={true} closeMenu={setTemplateCreation} userData={props.data} connection={props.connection}/>
           )
        }
    }
    






    return ( <div className="workouts-page-container">
        {renderWorkoutView()}


       <div className="workouts-page-wrapper">

           {renderTemplateCreation()}


           <div className="workouts-list-container">
               <div className="workouts-list-wrapper center-all">
                   <div className="workouts-list-header">
                       <div className="workouts-header-text">Workouts</div>
                       <button className="create-workout-button center-y" onClick={() => {setWorkoutViewData(); setWorkoutView(1)}}>Create Workout +</button>
                   </div>
                   <div className="workout-list-scroll"> 
                   {workoutsList.map((workout) => <WorkoutCard data={workout} openWorkoutView={setWorkoutView} setWorkoutViewData={setWorkoutViewData}/> )}
                   </div>
               
               </div>
           </div>
          

        <div className="right-side-container">
            <div className="chart-container">
                <div className="chart-container-header">
                    <div className="data-changer-button">Volume</div>
                </div>
                <div className="chart-wrapper">
                    <LineChart chartData={calculateChartData}/>
                </div>
            </div>
            <div className="templates-container">
                <div className="templates-container-header">Templates <button onClick={() => {setTemplateCreation(true)}}>Create Template</button></div>
                <div className="templates-wrapper">
                    {templatesList.map((template) => <TemplateCard setTemplatesList={setTemplatesList} data={template} userData={props.data} connection={props.connection}/>)}
                  
                </div>
            </div>
        </div>



       </div>

       

    </div> );
}
 
export default WorkoutsPage;