import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import {CURRENT_USER} from '../../graphQL/queries';
import {Link} from 'react-router-dom';

function ConnectedHome(){
    const { data, loading, error } = useQuery(
        CURRENT_USER,
        { fetchPolicy: "network-only" }
    );
    if(loading) return <></>
    return(
        <div>
            <p>Bienvenue {data.currentUser.name}</p>
            <p>Envie de jouer?</p>
            <Link to="/gameboard" className="btn">
                NOUVELLE PARTIE
                <i className="material-icons">add_circle
                </i>
            </Link>
            <p>Profil</p>
            <button className="btn">
                Modifier Mon profil
            </button>
        </div>
    )
}

export default ConnectedHome;