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
import {GAME_UPDATE, SUBMIT_UPDATE} from 'graphQL/subscriptions'


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
              console.log('GET_GAME_INFO CALLED')
                setGameInfo(getGameInfo)
            },
            onError(...error) {
              console.log(error)
            }
        }
    );

    const { dataSub, loadingSub } = useSubscription(
        GAME_UPDATE, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            console.log('NEW GAME DATA RECEIVED ', subscriptionData.data.gameUpdate)
            setGameInfo({...gameInfo, ...subscriptionData.data.gameUpdate})
        },
        onError(...error) {
          console.log(error)
        }
        }
    );

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
                gameInfo={gameInfo}
                userId={userId}
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
            {gameInfo && selectGameStatus(gameInfo)}
        </div>
    )
}

export default requireAuth(Game);