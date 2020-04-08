import React, {useState} from 'react';
import PlayerItem from 'components/PlayerItem';
import AdminGameControls from 'components/GameControls/AdminGameControls';
import PlayerControls from 'components/GameControls/PlayerControls';
import {JOIN_GAME, LEAVE_GAME} from 'graphQL/mutations';
import {useMutation, useSubscription, useQuery } from "@apollo/react-hooks";
import { CURRENT_USER } from 'graphQL/queries';
import {PLAYER_UPDATE_SUBSCRIPTION} from 'graphQL/subscriptions';

import "./Game.css";





const NewGame = ({gameId, playerslist, creatorId})=>{
    const [creator, setCreator] = useState(creatorId);
    const [players, setPlayers] = useState([...playerslist]);
    const {data: {currentUser}} = useQuery(CURRENT_USER)
    const [joinGame, { loading, error }] = useMutation(JOIN_GAME, {variables:{gameId}})
    const [leaveGame] = useMutation(LEAVE_GAME, {variables:{gameId}})
    const { data, loadingSub } = useSubscription(
        PLAYER_UPDATE_SUBSCRIPTION, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            setPlayers(subscriptionData.data.playerUpdate.players)
            setCreator(subscriptionData.data.playerUpdate.creator)
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
        <div className="new-game">
            <h4>Nouvelle partie</h4>
            {isGameAdmin && <AdminGameControls gameId={gameId} players={players}/>}
            {!isGameAdmin && <PlayerControls joinGame={joinGame} loading={loading} players={players} hasJoined={hasJoined}/>}
            <h5 className="center">La partie commence bientôt profitez-en pour réfléchir à votre premier mot!</h5>
            <div className="row">
                <div className="new-game__rules col m6 s12">
                <p className="new-game__rules-title center">Comment ça marche?</p>
                <p>Une fois que la partie compte au minimum 3 joueurs, le game master peut lancer le jeu.  Vous disposez de :
                </p>
                <p>- 1mn au premier tour pour écrire le mot ou la phrase initiale dans le champ texte</p>
                <p>- 1mn30 au tour suivant pour dessiner le mot qui vous sera donné</p>
                <p>- 30 secondes au tour suivant pour mettre un mot sur le dessin proposé dans le champs texte</p>
                <p>La page se met à jour en sauvegardant votre réponse et le chronomètre se lance automatiquement à chaque tour. Vous n'avez rien à faire.</p>
            </div>
                <div className="col m6 s12 new-game__players">
                    <p className="new-game__players-title">Liste des joueurs connectés à cette partie</p>
                        {   players.length>0
                            ?renderPlayers()
                            : <i>Aucun joueur connecté</i> 
                        }
                </div>
            </div>
        </div>
    )
}

export default NewGame;