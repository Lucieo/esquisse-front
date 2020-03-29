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

export default function AdminGameControls({name, gameId}){
    const [launchGame, { loading, error }] = useMutation(LAUNCH_GAME, {variables:{gameId, newStatus:"active"}})
    return(
        <>
            <i>Vous êtes administrateur de cette partie de esquissé. Invitez vos amis à rejoindre la partie puis cliquez sur lancer le jeu.</i>
            <div className="center">
                <p>LIEN A PARTAGER AVEC LES AUTRES JOUEURS</p>
                <p>{window.location.href}</p>
                <button className="btn" onClick={()=>launchGame()}>LANCER LE JEU</button>
            </div>
        </>
    )
}