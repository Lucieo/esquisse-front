import React, {useState} from 'react';
import PlayerItem from 'components/PlayerItem';
import AdminGameControls from 'components/GameControls/AdminGameControls';
import PlayerControls from 'components/GameControls/PlayerControls';
import {JOIN_GAME, LEAVE_GAME} from 'graphQL/mutations';
import {useMutation, useSubscription, useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { CURRENT_USER } from 'graphQL/queries';
import {PLAYER_UPDATE_SUBSCRIPTION} from 'graphQL/subscriptions'




const NewGame = ({gameId, playerslist, creatorId})=>{
    const [creator, setCretor] = useState(creatorId);
    const [players, setPlayers] = useState([...playerslist]);
    const {data: {currentUser}} = useQuery(CURRENT_USER)
    const [joinGame, { loading, error }] = useMutation(JOIN_GAME, {variables:{gameId}})
    //const [leaveGame] = useMutation(LEAVE_GAME, {variables:{gameId}})
    const { data, loadingSub } = useSubscription(
        PLAYER_UPDATE_SUBSCRIPTION, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            setPlayers(subscriptionData.data.playerUpdate.players)
            setCretor(subscriptionData.data.playerUpdate.creator)
        }
        }
    );
    
    const isGameAdmin = (currentUser.id === creator)
    const hasJoined = players.map(player=>player.id).indexOf(currentUser.id)>-1

    const renderPlayers = ()=>{
        return(
            <ul className="collection">
                {players.map((player, index)=><PlayerItem key={index} player={player} admin={player.id === creator}/>)}
            </ul>
        )
    }


    return(
        <div>
            <h4>Nouvelle partie</h4>
            {isGameAdmin && <AdminGameControls gameId={gameId} players={players}/>}
            {!isGameAdmin && <PlayerControls joinGame={joinGame} loading={loading} players={players} hasJoined={hasJoined}/>}
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