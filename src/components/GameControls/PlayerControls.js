import React, { useState } from "react";

export default function PlayerControls({
    joinGame,
    hasJoined,
    players,
    loading,
    leaveGame,
}) {
    const [blocked, setBlocked] = useState(false);
    const displayMessage = () => {
        if (!hasJoined) {
            return (
                <div className="center">
                    <p>
                        Vous avez été invité à jouer à une partie de esquissé,
                        cliquez sur le bouton ci dessous pour rejoindre les
                        participants :
                    </p>
                    <button
                        onClick={() => {
                            setBlocked(true);
                            joinGame();
                        }}
                        className={`btn ${(loading || blocked) && "disabled"}`}
                    >
                        {(loading || blocked) && (
                            <i className="material-icons">access_time</i>
                        )}
                        REJOINDRE LA PARTIE
                    </button>
                </div>
            );
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
    const quitGame = () => {
        if (hasJoined) {
            return (
                <div className="center">
                    <button onClick={() => leaveGame()} className={`btn`}>
                        QUITTER LA PARTIE
                    </button>
                </div>
            );
        }
    };

    return (
        <div className="centered">
            {quitGame()}
            {displayMessage()}
        </div>
    );
}
