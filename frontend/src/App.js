
import './App.css';
import WorkoutsPage from "./Components/WorkoutsPage/WorkoutsPage"
import LoginPage from "./Components/LoginPage/LoginPage"

import {useState, useEffect} from 'react'

function App() {


  let connection = 'http://localhost:3000/'

  const [appState, setAppState] = useState('login')
  const [userData, setUserData] = useState({})



  function renderView(){

    if(appState === 'login'){
      return(<LoginPage changeView={setAppState} setUserData={setUserData} connection={connection}/>)
    }
    else if(appState === 'workouts-page'){
      return(<WorkoutsPage data={userData} connection={connection}/>)
    }

  }


  return (
    <div className="App">
      <div className="app-wrapper">
        {renderView()}
      </div>
    </div>
  );
}

export default App;
