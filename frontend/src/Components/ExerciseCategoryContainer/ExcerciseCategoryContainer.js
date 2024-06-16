import React, {useState} from 'react';
import "./ExerciseCategoryContainer.css"
const ExerciseCategoryContainer = (props) => {

    const [dropDown, setDropDown] = useState(0)



    function dropDownStyle(){
        
        if(dropDown === 0){
            return('variant-container-closed')
        }
        else{
            return('variant-container-open')
        }
      

    }

    function toggleDropDown(){
        if(dropDown === 1){
            setDropDown(0)
        }
        else{setDropDown(1)
        }
    }



    function selectExercise(){
        
    }


    if(props.template){
        return(<div className="exercise-category-container" >
        <div className={"exercise-category-header " + props.data.category} onClick={toggleDropDown}>
            <div className="dark-cover"></div>
            {props.data.category} <i class="fas fa-caret-square-down"></i>
        </div>
    <div className={dropDownStyle()}>
    {props.data.exercises.map((exercise) => <div className="exercise-category-item" onClick={() => {props.addToList(exercise, props.category)}} >{exercise.name}<span className="center-y">{exercise.variants.length + ' Variants'}</span></div>)}
    </div>
</div>)
    }
    else{
        return ( <div className="exercise-category-container" >
        <div className={"exercise-category-header " + props.data.category} onClick={toggleDropDown}>
        <div className="dark-cover"></div>
            {props.data.category} <i class="fas fa-caret-square-down"></i>
        </div>
    <div className={dropDownStyle()}>
    {props.data.exercises.map((exercise) => <div className="exercise-category-item" onClick={() => {if(props.selectedExercise === exercise){props.selectExercise('')}else{props.selectExercise({exercise:exercise, category:props.category})} }}>{exercise.name}<span className="center-y">{exercise.variants.length + ' Variants'}</span></div>)}
    </div>
</div> );
    }

   
}
 
export default ExerciseCategoryContainer;