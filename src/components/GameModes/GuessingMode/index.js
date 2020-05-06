import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import applyCountdown from "components/Counter/applyCountdown";
import { SUBMIT_PAGE } from "graphQL/mutations";
import { useMutation } from "@apollo/react-hooks";

import "./GuessingMode.css";

const GuessingPanel = ({ lastPage, finished, pageId }) => {
    const [content, setContent] = useState("");
    const [submitPage, { loading, error }] = useMutation(SUBMIT_PAGE, {
        variables: {
            content,
            pageId,
        },
        onCompleted: () => {
            console.log("PAGE SUBMITTED ", pageId, "with content ", content);
        },
    });

    useEffect(() => {
        if (finished) {
            console.log("THIS IS THE END SUBMIT NOW");
            submitPage();
            setTimeout(function () {
                console.log("SUBMITTING AGAIN CAPORAL!");
                submitPage();
            }, 2000);
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
