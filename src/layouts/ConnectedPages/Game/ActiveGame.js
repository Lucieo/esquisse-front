import React, { useState } from 'react';
import requireAuth from 'components/requireAuth';
import GuessingMode from 'components/GameModes/GuessingMode';
import DrawingMode from 'components/GameModes/DrawingMode';
import InitMode from 'components/GameModes/InitMode';
import {useParams} from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Loading from 'components/Loading';
import GameMaster from 'components/GameMaster'
import {GET_SKETCHBOOK_DETAILS} from 'graphQL/queries';
import {CHANGE_GAME_STATUS} from 'graphQL/mutations';
import EndOfGame from 'components/EndOfGame';



const times ={
    "init":20000,
    "drawing":20000,
    "guessing":20000
}

const ActiveGame = ({gameInfo, userId})=>{
    const {gameId} = useParams();
    const [turn, setTurn] = useState(gameInfo.turn)
    const [gameEnd, SetGameEnd] = useState(false);
    const [endGame] = useMutation(CHANGE_GAME_STATUS, {variables:{gameId, newStatus:"over"}})

    if(turn>gameInfo.players.length-1 && !gameEnd){
        console.log('END GAME NOW TURN IS ' , turn)
        SetGameEnd(true)
    }
    
    const getSketchbookId = ()=>{
        let sketchbookId=""
        if(gameInfo.players){
            const playersIds = gameInfo.players.map(player=>player.id)
            const nextIndex = playersIds.indexOf(userId)+turn

            const sketchbooksMaxIndexes = gameInfo.sketchbooks.length-1;
            const newIndex = (nextIndex>sketchbooksMaxIndexes) ? (nextIndex-sketchbooksMaxIndexes-1) : nextIndex

            sketchbookId = gameInfo.sketchbooks.map(sketchbook=>sketchbook.id)[newIndex]
        }
        return sketchbookId
    }

    const sketchbookId = getSketchbookId()

    const {data, loading, error} =useQuery(
        GET_SKETCHBOOK_DETAILS, 
        {
            variables: {
                sketchbookId
            },
            fetchPolicy:'network-only',
            onError(...error) {
                console.log(error)
            }
        }
    );

    if(loading) return <Loading/>
    //console.log('ACTIVE GAME ERROR INFO', error)

    const gameMode = data && data.getSketchbookInfo.pages.length>0
    ? (
        data.getSketchbookInfo.pages[data.getSketchbookInfo.pages.length-1].pageType==="drawing" 
        ?"guessing"
        :"drawing"
    )
    : "init"

    const lastPage = gameMode==="init" ? {} : data.getSketchbookInfo.pages[data.getSketchbookInfo.pages.length-1]
    
    const selectGameMode = ()=>{
        if(gameMode=="init"){
            return <InitMode 
            timer={times[gameMode]}
            gameId={gameId}
            sketchbookId={sketchbookId}
            />
        }
        else if(gameMode==="drawing"){
            return <DrawingMode 
            timer={times[gameMode]}
            lastPage={lastPage}
            gameId={gameId}
            sketchbookId={sketchbookId}
            />
        }
        else if(gameMode==="guessing"){
            return <GuessingMode 
            timer={times[gameMode]}
            lastPage={lastPage}
            gameId={gameId}
            sketchbookId={sketchbookId}
            />
        }
    }

    return(
        <div className="container">
            {
                gameEnd
                ? <EndOfGame endGame={endGame}/>
                :
                <>
                {selectGameMode()}
                <GameMaster 
                    gameId={gameId}
                    nextTurn={()=>setTurn(turn+1)}
                    players={gameInfo.players}
                />
                </>
            }
        </div>
    )
}

export default requireAuth(ActiveGame);