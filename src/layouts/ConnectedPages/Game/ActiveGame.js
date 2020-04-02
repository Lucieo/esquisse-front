import React from 'react';
import requireAuth from 'components/requireAuth';
import GuessingMode from 'components/GameModes/GuessingMode';
import DrawingMode from 'components/GameModes/DrawingMode';
import InitMode from 'components/GameModes/InitMode';
import {useParams} from 'react-router-dom';

import {useQuery, useSubscription} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from 'components/Loading';

const GET_SKETCHBOOK_DETAILS = gql`
query GetSketchbookInfo($sketchbookId: ID!){
    getSketchbookInfo(sketchbookId:$sketchbookId){
        pages{
            content
            pageType
        }
    }
}
`;



const times ={
    "init":20000,
    "drawing":20000,
    "guessing":20000
}

const ActiveGame = ({sketchbookId})=>{
    const {gameId} = useParams();
    const {data, loading, error} =useQuery(
        GET_SKETCHBOOK_DETAILS, 
        {
            variables: {
                sketchbookId
            },
            fetchPolicy:'network-only'
        }) ;

    if(loading) return <Loading/>
    if(error) window.location.reload()

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
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(ActiveGame);