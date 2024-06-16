import React from 'react';
import "./SettingsModal.css"

const SettingsModal = (props) => {
    return ( <div className="settings-modal-container center-all">
        SETTINGS
        <button onClick={() => {props.deleteWorkout()}}>Delete Workout</button>
        <button onClick={() => {props.saveTemplate()}}>Make  Workout Template</button>
    </div> );
}
 
export default SettingsModal;