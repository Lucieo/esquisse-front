import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LAUNCH_GAME = gql`
mutation ChangeGameStatus($newStatus:String!, $gameId: ID!){
    changeGameStatus(gameId:$gameId, newStatus:$newStatus){
      status
      id
    }
  }
`;

export default function AdminGameControls({gameId, players}){
    const [launchGame, { loading, error }] = useMutation(LAUNCH_GAME, {variables:{gameId, newStatus:"active"}})
    
    return(
        <> 
            <div className="center">
                <div>
                    <p>Votre partie a bien été créée. Invitez vos amis à la rejoindre en partageant le lien ci-dessous.</p>
                    <p>LIEN A PARTAGER AVEC LES AUTRES JOUEURS</p>
                    <p>{window.location.href}</p>
                </div>
                <div>
                {
                    players.length>2
                    ? <button className="btn" onClick={()=>launchGame()}>LANCER LE JEU</button>
                    : <p>Un minimum de 3 joueurs est nécessaire pour lancer le jeu.</p>
                }
                </div>
            </div>
        </>
    )
}