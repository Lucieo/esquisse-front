import React from 'react';
import requireAuth from 'components/requireAuth';
import GuessingMode from 'components/GuessingMode';
import DrawingMode from 'components/DrawingMode';
import InitMode from 'components/InitMode';
import {useParams} from 'react-router-dom';

import {useQuery} from '@apollo/react-hooks';
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
    "init":90000,
    "drawing":180000,
    "guessing":120000
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

    console.log("GET SKETCHBOOK DETAILS CALL MADE ", data)
    const gameMode = data && data.getSketchbookInfo.pages.length>0
    ? (
        data.getSketchbookInfo.pages[data.getSketchbookInfo.pages.length-1].pageType==="drawing" 
        ?"guessing"
        :"drawing"
    )
    : "init"
    console.log("ACTIVE-GAME : GAME MODE VALUE", gameMode)

    const previousPage = gameMode==="init" ? {} :data.getSketchbookInfo.pages[-1]
    
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
            previousPage={previousPage} 
            timer={times[gameMode]}/>
        }
        else if(gameMode==="guessing"){
            return <GuessingMode 
            previousPage={previousPage} 
            timer={times[gameMode]}/>
        }
    }

    return(
        <div className="container">
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(ActiveGame);