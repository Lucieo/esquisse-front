import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import applyCountdown from "components/Counter/applyCountdown";
import { SUBMIT_PAGE } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";

import "./GuessingMode.css";

const GuessingPanel = ({
    lastPage,
    finished,
    sketchbookId,
    gameId,
    isGameMaster,
    turn,
}) => {
    const [content, setContent] = useState("");
    const pageType = "guessing";
    const [submitPage, { loading, error }] = useMutation(SUBMIT_PAGE, {
        variables: {
            content,
            pageType,
            gameId,
            sketchbookId,
        },
        onCompleted: () => {
            console.log(
                "PAGE SUBMITTED FOR SKETCHBOOK",
                sketchbookId,
                "with content ",
                content
            );
        },
    });

    useEffect(() => {
        if (finished) {
            if (process.env.REACT_APP_MODE === "TEST") {
                if (!isGameMaster) {
                    console.log("NOT GAME MASTER SUBMIT PAGE");
                    submitPage();
                } else {
                    if (turn < 3) {
                        console.log("GAME MASTER SUBMITTED ");
                        submitPage();
                    } else {
                        console.log("WILL NOT SUBMIT GAMEMASTER + turn is 3");
                    }
                }
            } else {
                submitPage();
            }
        }
    }, [finished]);

    return (
        <div className="center">
            <p>LE DESSIN A INTERPRETER</p>
            <CanvasDraw
                className="guessing-mode__canvas"
                disabled
                hideGrid
                loadTimeOffset={0}
                saveData={lastPage.content}
                hideInterface={true}
            />
            <p>Le mot deviné :</p>
            <p>
                Votre réponse sera automatiquement envoyée à la fin du chrono!
            </p>
            <input
                placeholder="Je vois je vois..."
                disabled={finished}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
};

export default applyCountdown(GuessingPanel);
