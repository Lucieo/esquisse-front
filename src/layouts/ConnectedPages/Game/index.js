import React, {useState, useEffect} from 'react';
import GameOver from './GameOver';
import NewGame from './NewGame';
import ActiveGame from './ActiveGame';
import {useParams} from 'react-router-dom';
import {useQuery, useSubscription, useMutation} from '@apollo/react-hooks';
import requireAuth from 'components/requireAuth';
import Loading from 'components/Loading';
import {GET_GAME_INFO, GET_USER_ID} from 'graphQL/queries';
import {LEAVE_GAME} from 'graphQL/mutations';
import {GAME_UPDATE, SUBMIT_UPDATE} from 'graphQL/subscriptions';
import NothingToSee from 'components/NothingToSee';
import OnGoingGame from './OnGoingGame';


const Game = (props)=>{
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState({})
    const user = useQuery(GET_USER_ID).data
    const userId = user && user.userId
    const [leaveGame] = useMutation(LEAVE_GAME, {variables:{gameId}, refetchQueries: [{
        query: GET_GAME_INFO,
        variables: {gameId}
    }]})


    const { data, loading, error } = useQuery(
        GET_GAME_INFO,
        { variables: {gameId},
            onCompleted({getGameInfo}){
                console.log("GET_GAME_INFO ", getGameInfo)
                setGameInfo(getGameInfo)
            },
            fetchPolicy:'network-only',
            onError(...error) {
              console.log(error)
            }
        }
    );

    const { dataSub, loadingSub } = useSubscription(
        GAME_UPDATE, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            console.log('GAME UPDATED INFO ', subscriptionData.data.gameUpdate)
            setGameInfo({...gameInfo, ...subscriptionData.data.gameUpdate})
        },
        onError(...error) {
          console.log(error)
        }
        }
    );

    useEffect(() => {
        return function cleanup() {
            console.log("LEAVING GAME!")
            leaveGame()
        };
      }, []);

    if(loading) return <Loading/>

    const selectGameStatus = ({status})=>{
        if(status==="new"){
            return <NewGame 
            gameId={gameId} 
            playerslist={gameInfo.players}
            creatorId={gameInfo.creator}
            />
        }
        else if(status==="active" && gameInfo.players.map(player=>player.id).indexOf(userId)>-1){
            return <ActiveGame
                gameInfo={gameInfo}
                userId={userId}
            />
        }
        else if(status==="active"){
            return <OnGoingGame/>
        }
        else if(status==="over"){
            return <GameOver
            gameId={gameId} 
            sketchbooks={gameInfo.sketchbooks}
            />
        }
        else if(status=="abandonned"){
            return <NothingToSee/>
        }
    }

    return(
        <div className="container">
            {gameInfo && selectGameStatus(gameInfo)}
        </div>
    )
}

export default requireAuth(Game);