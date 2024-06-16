import React, {useEffect} from 'react';
import "./WorkoutCard.css"
const WorkoutCard = (props) => {


    
    return ( <div className="workout-card-container" onClick={() => {props.openWorkoutView(1); props.setWorkoutViewData(props.data)}}>

    <div className="workout-card-title">{props.data.title}</div>
    <div className="workout-card-date">{props.data.dateCreated.slice(0,10)}</div>
    <div className="workout-exercise-count">{props.data.exercises.length}</div>

    </div> );
}
 
export default WorkoutCard;