import React, {useState} from 'react';
import GameOver from './GameOver';
import NewGame from './NewGame';
import ActiveGame from './ActiveGame';
import {useParams} from 'react-router-dom';
import {useQuery, useSubscription, useMutation} from '@apollo/react-hooks';
import requireAuth from 'components/requireAuth';
import Loading from 'components/Loading';
import {GET_GAME_INFO, GET_USER_ID} from 'graphQL/queries';
import {LEAVE_GAME} from 'graphQL/mutations';
import {GAME_UPDATE} from 'graphQL/subscriptions'


const Game = (props)=>{
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState({})
    const user = useQuery(GET_USER_ID).data
    const userId = user && user.userId
    const [leaveGame] = useMutation(LEAVE_GAME, {variables:{gameId}})

    const { data, loading, error } = useQuery(
        GET_GAME_INFO,
        { variables: {gameId},
            onCompleted({getGameInfo}){
                setGameInfo(getGameInfo)
            }
        }
    );

    const { dataSub, loadingSub } = useSubscription(
        GAME_UPDATE, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            setGameInfo({...gameInfo, ...subscriptionData.data.gameUpdate})
        }
        }
    );

    const getSketchbookId = ()=>{
        let sketchbookId=""
        if(gameInfo.players){
            const playersIds = gameInfo.players.map(player=>player.id)
            const nextIndex = playersIds.indexOf(userId)+gameInfo.turn

            const sketchbooksMaxIndexes = gameInfo.sketchbooks.length-1;
            const newIndex = (nextIndex>sketchbooksMaxIndexes) ? (nextIndex-sketchbooksMaxIndexes-1) : nextIndex

            sketchbookId = gameInfo.sketchbooks.map(sketchbook=>sketchbook.id)[newIndex]
        }
        return sketchbookId
    }

    if(loading) return <Loading/>

    const selectGameStatus = ({status})=>{
        if(status==="new"){
            return <NewGame 
            gameId={gameId} 
            playerslist={gameInfo.players}
            creatorId={gameInfo.creator}
            />
        }
        else if(status==="active"){
            return <ActiveGame
                sketchbookId={getSketchbookId()}
            />
        }
        else if(status==="over"){
            return <GameOver
            gameId={gameId} 
            sketchbooks={gameInfo.sketchbooks}
            />
        }
    }

    return(
        <div className="container">
            {selectGameStatus(gameInfo)}
        </div>
    )
}

export default requireAuth(Game);