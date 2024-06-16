import React from 'react'
import axios from 'axios'
import "./TemplateCard.css"

const TemplateCard = (props) => {



function deleteTemplate(){
    let postObject = {
        name: props.userData.name,
        templateID: props.data.id,
    }
    axios.post(props.connection + 'user/deleteTemplate', postObject).then((res) => {
        console.log(res)
        props.setTemplatesList(res.data)
    })
}



    return ( <div className="template-card-container">

        <button onClick={deleteTemplate} className="delete-template-button">X</button>
        <div className="template-card-category-header"></div>
        <div className="template-body">
            <div className="template-title">{props.data.templateName}</div>
            <div className="template-set-count center-y">{props.data.exercises.length} Exercises</div>
       

        <div className="template-change-container"></div>
        </div>
        
    </div> );
}
 
export default TemplateCard;