import React, {useState} from 'react';
import "./Exercise.css"
import axios from 'axios'
import { set } from 'mongoose';

const Exercise = (props) => {

    const [setList, setSetList] = useState(props.data.sets)
    const [addSetRender, setAddSetRender] = useState(false)
    const [updater, setUpdater] = useState(0)



    function renderAddSet(){
        if(addSetRender === true){
            return(<div><input className="weight-input"  placeholder="Enter Weight" /> <input className="reps-input" placeholder="Enter Reps"/><button onClick={() => {addSet(); setAddSetRender(false)}}>SUBMIT</button></div>)
        }
    }


    function addSet(){


       // console.log(props.data);\
       let volumeOfSet;

       let newSet = {reps: parseInt(document.querySelector('.reps-input').value),
                    weight:parseInt(document.querySelector('.weight-input').value)}

        volumeOfSet = (newSet.reps * newSet.weight)

        let addSetPostObject = {
           workoutID: props.workoutData._id,
           name:props.userData.name,
           newSet: newSet,
           exerciseID:props.data.ID

        }
        axios.post(props.connection + '/user/addSet', addSetPostObject).then((res) => {
           // console.log(res)
            setSetList(res.data.sets)
            updateExerciseStats(res.data.sets)
        })

        let theSetList = setList;
     


      
        props.setWorkoutVolume(props.workoutVolume + volumeOfSet)
       
        

    }

    function deleteSet(set){

        let i;
        let theList = setList;
        let volumeOfSet;
        for(i = 0; i < theList.length ; i++){

            if(theList[i] === set){
                //alert(JSON.stringify(theList[i]))
                volumeOfSet = (theList[i].reps * theList[i].weight)
                theList.splice(i, 1)
            }

        }

        setSetList(theList)
        props.setUpdater(props.updater + 1)

        console.log(theList)


        let postObject = {
            
            workoutID: props.workoutData._id,
            name:props.userData.name,
            exerciseID:props.data.ID,
            delete: true,
            setList: theList
 
         }

        axios.post(props.connection + '/user/addSet', postObject).then((res) => {
            // console.log(res)
             setSetList(res.data.sets)
         })


         props.setWorkoutVolume(props.workoutVolume - volumeOfSet)
         console.log(props.workoutVolume - volumeOfSet)
         

    }



    function updateExerciseStats(setList){

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        console.log("TODAY" + today);
        let updateStatsPostObject = {
            name:props.userData.name,
            exerciseInfo: {
            exerciseName: props.data.name,
            sets: setList, 
            date: today
            }
        }
        axios.post(props.connection + '/user/updateStats', updateStatsPostObject).then((res) => {

        })
    }


    function deleteExercise(){


        let postObject = {
            workoutID: props.workoutData._id,
           name:props.userData.name,
           exerciseID:props.data.ID,
        }

        axios.post(props.connection + '/user/deleteExercise', postObject).then((res) => {
            console.log(res)
  
            props.setExercisesList(res.data[0].exercises)

        })
    }


    return ( <div className="exercise-container center-x">
       
       <div className="exercise-name">{props.data.name}</div>
       <div className={"categories-container " + props.data.category}>{props.data.category}</div>
       <div className="sets-list-container">
           {setList.map((set) => <div className="set-block center-y">{set.reps} x {set.weight}<span onClick={ () => {deleteSet(set)}} className="delete-set">-</span></div>)}
           <button className="add-set-button center-y" onClick={() => {setAddSetRender(true)}}>+</button>
           {renderAddSet()}
       </div>
       <button className="delete-exercise-button" onClick={deleteExercise}>X</button>
    </div> );
}
 
export default Exercise;