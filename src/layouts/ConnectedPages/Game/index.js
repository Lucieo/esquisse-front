import React, {useState} from 'react';
import GameOver from './GameOver';
import NewGame from './NewGame';
import ActiveGame from './ActiveGame';
import {useParams} from 'react-router-dom';
import {useQuery, useSubscription, useMutation} from '@apollo/react-hooks';
import requireAuth from 'components/requireAuth';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import {LEAVE_GAME} from 'graphQL/mutations';

const GET_GAME_INFO= gql`
query GetGameInfo($gameId:ID!){
    getGameInfo(gameId:$gameId){
      id
      status
      turn
      players{
        id
        name
        icon
        iconColor
      }
      creator
      sketchbooks
    }
  }
`

const GAME_UPDATE = gql`
subscription GameUpdate($gameId:ID!){
    gameUpdate(gameId:$gameId){
      status
      creator
      turn
      sketchbooks
      players{
        id
        name
        icon
        iconColor
      }
    }
  }
`
const GET_USER_ID = gql`
  {
    userId @client
  }
`;





const Game = (props)=>{
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState({})
    const user = useQuery(GET_USER_ID).data
    const userId = user && user.userId
    const [leaveGame] = useMutation(LEAVE_GAME, {variables:{gameId}})

    //window.onbeforeunload = () =>leaveGame()

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
            console.log('GAME-INDEX : SUBSCRIPTION NEW GAME INFO RECEIVED', subscriptionData.data.gameUpdate)
            setGameInfo({...gameInfo, ...subscriptionData.data.gameUpdate})
        }
        }
    );

    const getSketchbookId = ()=>{
        console.log('GAME-INDEX-GETSKETCHBOOKID DATA  players:', gameInfo.players, 'turn ', gameInfo.turn, 'sketchbooks ', gameInfo.sketchbooks)
        let sketchbookId=""
        if(gameInfo.players){
            const playersIds = gameInfo.players.map(player=>player.id)
            const userIndex = playersIds.indexOf(userId)
            const newIndex = (userIndex+gameInfo.turn>gameInfo.sketchbooks.length-1) ? gameInfo.turn : userIndex+gameInfo.turn
            sketchbookId = gameInfo.sketchbooks[newIndex]
            console.log("GAME-INDEX-GETSKETCHBOOKID CHOSEN", "index ", newIndex, "sketchbookid ", sketchbookId)
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
            return <GameOver/>
        }
    }

    return(
        <div className="container">
            {selectGameStatus(gameInfo)}
        </div>
    )
}

export default requireAuth(Game);