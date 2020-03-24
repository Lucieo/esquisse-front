import React from 'react';
import Header from './layouts/Header/Header';
import Login from './layouts/Login/Login';
import Singup from './layouts/Signup/Signup';
import Home from './layouts/Home/Home';
import Profil from './layouts/Profil/Profil';
import Gameboard from './layouts/GameBoard';
import {
  Switch,
  Route,
} from "react-router-dom";

const App = (props) =>{
    return(
        <>
            <Header/>
            <div>
              <Switch>
                <Route path="/" exact>
                  <Home/>
                </Route>
                <Route path="/profil" exact>
                  <Profil/>
                </Route>
                <Route path="/login">
                  <Login />
                </Route>
                <Route path="/signup">
                  <Singup />
                </Route>
                <Route path="/gameboard/:gameId">
                  <Gameboard />
                </Route>
              </Switch>
            </div>
        </>
    )
}

export default App;