import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./Controls.css";
import { CHANGE_GAME_STATUS } from "graphQL/mutations";

export default function AdminGameControls({ gameId, players }) {
    const [launchGame, { loading, error }] = useMutation(CHANGE_GAME_STATUS, {
        variables: { gameId, newStatus: "active" },
    });
    const [copied, setCopied] = useState(false);
    const minPlayers = process.env.REACT_APP_MODE === "TEST" ? 0 : 2;
    if (loading) return <div></div>;
    return (
        <>
            <div className="center">
                <div className="admin-controls__share-link">
                    <p>
                        Votre partie a bien été créée. Invitez vos amis à la
                        rejoindre en partageant le lien ci-dessous.
                    </p>
                    <p>
                        LIEN A PARTAGER AVEC LES AUTRES JOUEURS (CLIQUEZ POUR
                        COPIER)
                    </p>
                    <p className="admin-control__info">
                        {copied && "lien copié dans le presse papier"}
                    </p>
                    <CopyToClipboard
                        text={window.location.href}
                        onCopy={() => setCopied(true)}
                    >
                        <p className="btn">{window.location.href}</p>
                    </CopyToClipboard>
                </div>
                <div>
                    {players.length > 2 ? (
                        <>
                            <p>Prêts à commencer?</p>
                            <button
                                className={`btn ${loading && "disabled"}`}
                                onClick={() => launchGame()}
                            >
                                {loading && (
                                    <i className="material-icons">
                                        access_time
                                    </i>
                                )}
                                LANCER LE JEU
                            </button>
                        </>
                    ) : (
                        <p>
                            Un minimum de 3 joueurs est nécessaire pour lancer
                            le jeu.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
