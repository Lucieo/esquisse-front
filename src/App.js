import React from 'react';
import Header from './layouts/Header/Header';
import Login from './layouts/Login/Login';
import Singup from './layouts/Signup/Signup';
import Home from './layouts/Home/Home';
import Profil from './layouts/Profil/Profil';
import Game from './layouts/Game';
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
                <Route path="/game/:gameId">
                  <Game />
                </Route>
              </Switch>
            </div>
        </>
    )
}

export default App;