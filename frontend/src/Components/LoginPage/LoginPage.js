import React from 'react';
import axios from 'axios'
import "./LoginPage.css"
import WorkoutsPage from "../WorkoutsPage/WorkoutsPage"


const LoginPage = (props) => {




    function loginUser(){
        let username = document.querySelector('.username-input').value
        let password = document.querySelector('.password-input').value


        //http://localhost:5000
    
        axios.post(props.connection + '/user/login', 
        {name: username, password:password})
        .then((res) => {
            console.log(res)
            if(res.data.error == null){
              props.setUserData(res.data)
              props.changeView('workouts-page')
              
            }
            else{
              
            }
         })
    
      }


      function registerUser(){

        let username = document.querySelector('.username-input').value
        let password = document.querySelector('.password-input').value
        axios.post(props.connection + '/user/register', 
        {name: username, password:password})
        .then((res) => {
            console.log(res)
            if(res.data.error == null){
              props.setUserData(res.data)
              props.changeView('workouts-page')
              
            }
            else{
              
            }
         })
        

      }






    return ( <div className="login-page-container">
        <div className="login-page-wrapper center-all">
            <input className="username-input center-x" placeholder="Username"/>
            <input className="password-input center-x" placeholder="Password"/>
        
        <div className="buttons-container center-x">
            <button className="login-button" onClick={loginUser}>Login</button>
            <button className="register-button" onClick={registerUser}>Register</button>
        </div>

        </div>
    </div> );
}
 
export default LoginPage; 