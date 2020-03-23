import React from 'react';
import requireAuth from '../../components/requireAuth';
import GuessingMode from '../../components/GuessingMode';
import DrawingMode from '../../components/DrawingMode';
import GameOver from './GameOver';
import NewGame from './NewGame';

const GameBoard = ()=>{
    const gameMode = "drawing";

    const selectGameMode = ()=>{
        if(gameMode==="new") return <NewGame/>
        if(gameMode==="drawing") return <DrawingMode word={'lapin'}/>
        if(gameMode==="guessing") return <GuessingMode/>
        if(gameMode==="over") return <GameOver/>
    }

    return(
        <div class="container">
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(GameBoard);