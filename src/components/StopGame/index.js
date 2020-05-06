import React, { useEffect } from "react";
import GearLoader from "images/gearLoader.gif";
import "./StopGame.css";
import { CHANGE_GAME_STATUS } from "graphQL/mutations";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Countdown from "components/Counter/Countdown";

export default function StopGame({ isGameMaster }) {
    const { gameId } = useParams();
    const [endGame] = useMutation(CHANGE_GAME_STATUS, {
        variables: {
            gameId,
            newStatus: "over",
        },
        onCompleted: () => {
            console.log("ending game done");
        },
    });

    //5 seconds to wait before receiving update game call with new turn
    const getTimer = () => {
        const timer = new Date();
        timer.setSeconds(timer.getSeconds() + 5);
        return timer;
    };

    useEffect(() => {
        //in case update called has not been received reload in 8 seconds
        const reloadInCase = setTimeout(() => {
            window.location.reload();
        }, 8000);
        return function cleanup() {
            console.log("CLEANING TIMEOUT");
            clearTimeout(reloadInCase);
        };
    });

    const setTime = getTimer();
    return (
        <div className="stopGame">
            <div className="stopGame__content">
                <Countdown setTime={setTime} />
                <h4>HAUT LES MAINS</h4>
                <p>
                    Le timer est écoulé votre réponse a été envoyée. Ne touchez
                    à rien la page se mettra automatiquement à jour une fois
                    toutes les réponses reçues.
                </p>
                <h5>synchronisation de la partie en cours</h5>
                <img
                    className="stopGame__loader"
                    src={GearLoader}
                    alt="gear loader"
                />
                {isGameMaster && (
                    <div className="stopGame__emergency">
                        <h5>EN CAS D'URGENCE</h5>
                        <p>SEUL LE GAME MASTER A ACCES A CETTE ACTION</p>
                        <h5>Le jeu s'est bloqué?</h5>
                        <p>
                            Vous pouvez abandonner la partie et tenter de passer
                            directement aux résultats en cliquant sur le bouton
                            ci dessous :
                        </p>
                        <button className="btn" onClick={() => endGame()}>
                            Terminer le jeu
                        </button>
                    </div>
                )}
            </div>
            <div className="stopGame__overlay"></div>
        </div>
    );
}
