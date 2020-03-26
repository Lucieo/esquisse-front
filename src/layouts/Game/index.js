import React, {useState} from 'react';
import GameOver from './GameOver';
import NewGame from './NewGame';
import ActiveGame from './ActiveGame';
import {useParams} from 'react-router-dom';
import {useQuery, useSubscription} from '@apollo/react-hooks';
import requireAuth from '../../components/requireAuth';
import gql from 'graphql-tag';
import Loading from '../../components/Loading';

const GET_GAME_INFO= gql`
query GetGameInfo($gameId:ID!){
    getGameInfo(gameId:$gameId){
      id
      status
      players{
        name
        icon
        iconColor
      }
      creator
    }
  }
`

const GAME_STATUS_CHANGE = gql`
subscription GameStatusChange($gameId:ID!){
    gameStatusChange(gameId:$gameId){
      status
    }
  }
`


const Game = (props)=>{
    const {gameId} = useParams();
    const [gameInfo, setGameInfo] = useState({})
    const { data, loading, error } = useQuery(
        GET_GAME_INFO,
        { variables: {gameId},
            onCompleted({getGameInfo}){
                setGameInfo(getGameInfo)
            }
        }
    );
    const { dataSub, loadingSub } = useSubscription(
        GAME_STATUS_CHANGE, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            console.log(subscriptionData)
            setGameInfo({...gameInfo, status:subscriptionData.data.gameStatusChange.status})
        }
        }
    );
    if(loading) return <Loading/>
    console.log(gameInfo)

    const selectGameStatus = ({status})=>{
        if(status==="new"){
            return <NewGame gameId={gameId} playerslist={gameInfo.players}/>
        }
        else if(status==="active"){
            return <ActiveGame/>
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