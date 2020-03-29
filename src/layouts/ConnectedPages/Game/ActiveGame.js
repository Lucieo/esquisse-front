import React from 'react';
import requireAuth from 'components/requireAuth';
import GuessingMode from 'components/GuessingMode';
import DrawingMode from 'components/DrawingMode';
import InitMode from 'components/InitMode';
import Countdown from 'react-countdown';

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
    const {data, loading, error} =useQuery(
        GET_SKETCHBOOK_DETAILS, 
        {
            variables: {
                sketchbookId
            },
            onCompleted(response){
                console.log(response)
            }
        }) ;

    if(loading) return <Loading/>

    const gameMode = data.getSketchbookInfo.pages.length>0
    ? (
        data.getSketchbookInfo.pages[-1].pageType==="drawing" 
        ?"guessing"
        :"drawing"
    )
    : "init"

    const previousPage = gameMode==="init" ? {} :data.getSketchbookInfo.pages[-1]
    
    const selectGameMode = ()=>{
        if(gameMode=="init"){
            return <InitMode/>
        }
        else if(gameMode==="drawing"){
            return <DrawingMode previousPage={previousPage}/>
        }
        else if(gameMode==="guessing"){
            return <GuessingMode previousPage={previousPage}/>
        }
    }

    return(
        <div className="container">
            <div className="drawing-mode__countdown">
                <i className="material-icons">access_alarm</i>
                <Countdown date={Date.now() + times[gameMode]} />
            </div>
            {selectGameMode()}
        </div>
    )
}

export default requireAuth(ActiveGame);