import React from 'react';
import {useMutation} from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';

const CREATE_GAME = gql`
mutation{
    createGame{
        id
    }
  }
`;

export default function CreateGame(){
    const history = useHistory();
    const [createGame, {createGameData}] = useMutation(
        CREATE_GAME,
        {
            onCompleted({createGame}){
                history.push(`/game/${createGame.id}`)
            }
        }
    )

    return(
        <>
            <p>Envie de jouer?</p>
            <button 
            onClick={()=>createGame()}
            className="btn">
                NOUVELLE PARTIE
            </button>
        </>
    )
}