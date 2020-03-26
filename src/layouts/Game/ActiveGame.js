import React from 'react';
import requireAuth from '../../components/requireAuth';
import GuessingMode from '../../components/GuessingMode/GuessingMode';
import DrawingMode from '../../components/DrawingMode/DrawingMode';
import GameOver from './GameOver';
import NewGame from './NewGame';

const ActiveGame = ()=>{
    const gameMode = "new";

    const selectGameMode = ()=>{
        if(gameMode==="drawing"){
            return <DrawingMode word={'lapin'}/>
        }
        else{
            return <GuessingMode/>
        }
    }

    return(
        <div className="container">
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(ActiveGame);