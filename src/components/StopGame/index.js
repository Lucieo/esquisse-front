import React from "react";
import GearLoader from "images/gearLoader.gif";
import "./StopGame.css";
import { DEBUG_GAME, CHANGE_GAME_STATUS } from "graphQL/mutations";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

export default function StopGame({ isGameMaster }) {
    const { gameId } = useParams();
    const [debugGame] = useMutation(DEBUG_GAME, {
        variables: {
            gameId,
        },
        onCompleted: () => {
            console.log("debug done");
        },
    });
    const [endGame] = useMutation(CHANGE_GAME_STATUS, {
        variables: {
            gameId,
            newStatus: "over",
        },
        onCompleted: () => {
            console.log("ending game done");
        },
    });
    return (
        <div className="stopGame">
            <div className="stopGame__content">
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
                        <p>SEUL LE GAME MASTER A ACCES A CES OPTIONS</p>
                        <p>
                            Si cette page s'affiche plus de 30 secondes, cela
                            veut dire qu'il y a eu un problème dans l'envoi des
                            réponses de joueurs. Cliquez sur le bouton ci
                            dessous pour tenter de débloquer le jeu. ATTENTION :
                            attendez bien au moins 30 secondes avant de lancer
                            ce déblocage car cette opération pourra créer des
                            blancs dans la chaîne de dessins/devinette.
                        </p>
                        <button className="btn" onClick={() => debugGame()}>
                            Débloquer le jeu
                        </button>
                        <h5>Le jeu s'est bloqué plusieurs fois de suite?</h5>
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
