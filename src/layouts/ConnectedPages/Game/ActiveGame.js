import React, { useState } from 'react';
import requireAuth from 'components/requireAuth';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import Loading from 'components/Loading';
import {GET_SKETCHBOOK_DETAILS} from 'graphQL/queries';
import {TIME_TO_SUBMIT} from 'graphQL/subscriptions';
import GameModes from 'components/GameModes'


const ActiveGame = ({gameInfo, userId})=>{
    const turn = gameInfo.turn
    const [pages, setPages] = useState({});
    const timeToSubmit = useSubscription(
        TIME_TO_SUBMIT, {variables:{gameId:gameInfo.id},
        onSubscriptionData: ({client, subscriptionData})=>{
            console.log('TIME TO SUBMIT')
        }
        }
    );

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
    const sketchbookId = getSketchbookId();

    const {data, loading, error} =useQuery(
        GET_SKETCHBOOK_DETAILS, 
        {
            variables: {
                sketchbookId
            },
            fetchPolicy:'network-only',
            onCompleted({getSketchbookInfo}){
                setPages(getSketchbookInfo.pages)
            },
            onError(...error) {
                console.log(error)
            }
        }
    );

    if(loading) return <Loading/>

    return(
        <div className="container">
            {
                // gameEnd
                // ? <EndOfGame endGame={endGame}/>
                // :
                <GameModes 
                    pages={pages} 
                    sketchbookId={sketchbookId} 
                    turn={turn}
                />
            }
        </div>
    )
}

export default requireAuth(ActiveGame);