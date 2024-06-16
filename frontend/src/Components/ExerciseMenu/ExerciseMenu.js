import React, {useState} from 'react';
import "./ExerciseMenu.css"
import exerciseData from "../../JSON Data/ExerciseList.json"
import ExerciseCategoryContainer from "../ExerciseCategoryContainer/ExcerciseCategoryContainer"
import axios from 'axios';
const ExerciseMenu = (props) => {


    const [selectedExercise,  setSelectedExercise] = useState('')
    const [selectedList, setSelectedList] = useState([]);
    const [counter, setCounter] = useState(0)
    
   

    function exerciseButtonStyle(type){
        if(type === 'template'){
            if(selectedList.length != 0){
                return('submit-template-button-fill')
            }
            else{
                return('submit-template-button-empty')
            }
        }
        else{
            if(selectedExercise != ''){
                return('menu-add-exercise-button-selected')
            }
            else{
                return('menu-add-exercise-button-empty')
            }
        }
    }

    function saveExercise(){
        let exerciseObject = {
            name: selectedExercise.exercise.name,
            ID: Math.floor(Math.random() * 10000),
            category:selectedExercise.category,
            sets:[],
            type: selectedExercise.exercise.type
        }

        console.log(selectedExercise)

        axios.post(props.connection + 'user/addExercise', {
            name:props.userData.name,
            newExercise: exerciseObject,
            workoutID: props.data._id
        }).then((res) => {
            let oldList = props.exercises;
            let newList = oldList;
            newList.push(exerciseObject)
            setSelectedExercise(exerciseObject)
            console.log(newList)
            props.updateExerciseList(newList)
            props.setUpdater(props.updater + 1)
        })
       
    }

    function saveTemplate(){

        let templateName = document.querySelector('.template-name-input').value;


        let postObject = {
            name: props.userData.name,
            templateName: templateName,
            exercises: selectedList,
        }

        axios.post(props.connection + 'user/addTemplate', postObject).then((res) => {
            console.log(res)
            props.setTemplatesList(res.data)
        })


        props.closeMenu(false)
       
        
        console.log(postObject)

    }


    function updateSelectedList(newItem, category){

        let newObject = newItem
        newObject.category = category
        let i;
        let found = false;
        let theList = selectedList;
        if(theList.length > 0){
            for(i = 0; i < theList.length; i++){
                if(theList[i].name === newItem.name){
                   found = true;
                    theList.splice(i ,1)
                   break;
                }
            }
            if(found === false){
                console.log('No Name Match Push')
                theList.push(newItem)
            }
        }
        else{
            theList.push(newItem)
        }
        
        setSelectedList(theList)
        console.log(selectedList)
        setCounter(counter + 1)
    }


    if(props.template){
        return (<div className="template-creation-container center-all"> 
        <div className="exercise-menu-container-template">
        <div className="exercise-list">
        {exerciseData.exerciseList.map((exercise) => <ExerciseCategoryContainer  addToList={updateSelectedList} template={true} category={exercise.category} data={exercise} selectExercise={setSelectedExercise} selectedExercise={selectedExercise} />)}
        </div>
    </div>
    <div className="selected-exercise-list-container">
        <div className="selected-list-header">Template Preview</div>
        <input className="template-name-input center-x" placeholder="Enter Template Name"/>
        {selectedList.map((exercise) => <div className="selected-exercise-list"><div className={exercise.category + " exercise-indicator center-y"}></div>{exercise.name}</div>)}
    </div>
        <button className="close-exercise-menu-button" onClick={() => {props.closeMenu(false)}}>X</button>
        <button className={exerciseButtonStyle('template') + ' center-x'} onClick={() => {saveTemplate()}}>Submit Template</button>
    </div> );
    }
    else{
        return ( <div className="exercise-menu-container center-all">
        
        <div className="exercise-list">
        {exerciseData.exerciseList.map((exercise) => <ExerciseCategoryContainer data={exercise} category={exercise.category} selectExercise={setSelectedExercise} selectedExercise={selectedExercise}/>)}
        </div>
        
        <button className="close-exercise-menu-button" onClick={() => {props.closeMenu(0)}}>X</button>
        <button className={exerciseButtonStyle('workout-view') + ' center-x'} onClick={() => {saveExercise()}}>Add Exercise</button>
    </div> );
    }
}
 
export default ExerciseMenu;