import React from 'react';
import GearLoader from 'images/gearLoader.gif';
import './StopGame.css';

export default function StopGame(){
    return(
        <div className="stopGame">
            <div className="stopGame__content">
                <h4>HAUT LES MAINS</h4>
                <p>Le timer est écoulé votre réponse a été envoyée. Ne touchez à rien la page se mettra automatiquement à jour une fois toutes les réponses reçues.</p>
                <h5>synchronisation de la partie en cours</h5>
                <img className="stopGame__loader" src={GearLoader} alt='gear loader'/>
            </div>
            <div className="stopGame__overlay"></div>
        </div>
    )
}