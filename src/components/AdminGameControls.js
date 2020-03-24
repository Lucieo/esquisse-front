import React from 'react';

export default function AdminGameControls({name}){
    return(
        <>
            <i>Vous êtes administrateur de cette partie de esquissé. Invitez vos amis à rejoindre la partie puis cliquez sur lancer le jeu.</i>
            <div className="center">
                <p>LIEN A PARTAGER AVEC LES AUTRES JOUEURS</p>
                <p>{window.location.href}</p>
                <button className="btn">LANCER LE JEU</button>
            </div>
        </>
    )
}