import React from 'react';
import Sherlock from 'images/sherlock.png';
import './SubmitMode.css';

export default function Modal(props){
    return(
        <div className="center submit-mode">
            <h3>Pas si vite l'ami!</h3>
            <p>Après enquête on dirait bien que vous avez déjà envoyé votre réponse...</p> 
            <p>Attendez que tout le monde ai répondu pour continuer le jeu, ne touchez à rien la page se rechargera toute seule.</p>
            <img src={Sherlock} alt="detective"/>
        </div>

    )
}