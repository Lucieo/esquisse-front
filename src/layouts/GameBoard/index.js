import React from 'react';
import requireAuth from '../../components/requireAuth';
import GuessingMode from '../../components/GuessingMode/GuessingMode';
import DrawingMode from '../../components/DrawingMode/DrawingMode';
import GameOver from './GameOver';
import NewGame from './NewGame';
import ActiveGame from './ActiveGame';

const GameBoard = ()=>{
    const gameMode = "new";

    const selectGameMode = ()=>{
        if(gameMode==="new"){
            return <NewGame players={[{name:"José", id:'43555FFF'}]}/>
        }
        else if(gameMode==="active"){
            return <ActiveGame/>
        }
        else if(gameMode==="over"){
            return <GameOver/>
        }
    }

    return(
        <div className="container">
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(GameBoard);