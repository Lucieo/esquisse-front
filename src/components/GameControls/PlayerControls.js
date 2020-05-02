import React from "react";

export default function PlayerControls({
    joinGame,
    hasJoined,
    players,
    loading,
}) {
    const displayMessage = () => {
        if (!hasJoined) {
            if (!loading) {
                return (
                    <div className="center">
                        <p>
                            Vous avez été invité à jouer à une partie de
                            esquissé, cliquez sur le bouton ci dessous pour
                            rejoindre les participants :
                        </p>
                        <button onClick={() => joinGame()} className="btn">
                            REJOINDRE LA PARTIE
                        </button>
                    </div>
                );
            } else {
                return <p>Connexion en cours</p>;
            }
        } else {
            if (players.length < 3) {
                return (
                    <p>
                        Vous avez rejoint la partie, un nombre minimal de 3
                        joueurs est nécessaire pour jouer.
                    </p>
                );
            } else {
                return (
                    <p>
                        Vous avez rejoint la partie, nous attendons que le game
                        master lance la partie.
                    </p>
                );
            }
        }
    };

    return <div className="centered">{displayMessage()}</div>;
}
