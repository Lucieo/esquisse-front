import React, {useState} from 'react';
import PlayerItem from '../../components/PlayerItem';
import AdminGameControls from '../../components/AdminGameControls';
import {JOIN_GAME} from '../../graphQL/mutations';
import {useMutation, useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const PLAYER_JOINED_SUBSCRIPTION = gql`
  subscription PlayerJoined($gameId: ID!) {
    playerJoined(gameId:$gameId){
        player{
            name
            icon
            iconColor
        }
    }
  }
`;



const NewGame = ({gameId, isGameAdmin=true, playerslist})=>{
    const [players, setPlayers] = useState([...playerslist]);
    const [joinGame, { loading, error }] = useMutation(JOIN_GAME, {variables:{gameId}})
    const { data, loadingSub } = useSubscription(
        PLAYER_JOINED_SUBSCRIPTION, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            const newPlayer = subscriptionData.data.playerJoined.player
            setPlayers([...players, newPlayer])
        }
        }
    );
    const renderPlayers = ()=>{
        return(
            <ul className="collection">
                {players.map((player, index)=><PlayerItem key={index} player={player}/>)}
            </ul>
        )
    }
    return(
        <div>
            <h4>Nouvelle partie</h4>
            <button onClick={()=>    joinGame()}>JOIN</button>
            {
                isGameAdmin &&
                <AdminGameControls gameId={gameId}/>
            }
            <div>
                <p>Liste des joueurs connectés à cette partie</p>
                    {   players.length>0
                        ?renderPlayers()
                        : <i>Aucun joueur connecté</i> 
                    }
            </div>
        </div>
    )
}

export default NewGame;