import React from 'react';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {CURRENT_USER} from '../../graphQL/queries';
import {CREATE_GAME} from '../../graphQL/mutations';
import {Link} from 'react-router-dom';
import './Home.css';
import { useHistory } from "react-router-dom";

function ConnectedHome(){
    const history = useHistory();
    const { data, loading, error } = useQuery(
        CURRENT_USER,
        { fetchPolicy: "network-only" }
    );
    
    const [createGame, {createGameData}] = useMutation(
        CREATE_GAME,
        {
            onCompleted({createGame}){
                history.push(`/gameboard/${createGame.gameboardId}`)
            }
        }
    )

    if(loading) return <></>
    return(
        <div className="center connected-home">
            <i className="material-icons large connected-home__icon" style={{color: data.currentUser.iconColor}}>{data.currentUser.icon}</i>
            <p>Bienvenue</p>
            <h4>{data.currentUser.name}</h4>
            <p>Profil</p>
            <Link to="/profil" className="btn">
                Modifier Mon profil
            </Link>
            <p>Envie de jouer?</p>
            <button 
            onClick={()=>createGame()}
            className="btn">
                NOUVELLE PARTIE
            </button>
        </div>
    )
}

export default ConnectedHome;