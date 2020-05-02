import React from "react";
import { useParams } from "react-router-dom";
import GuessingMode from "components/GameModes/GuessingMode";
import DrawingMode from "components/GameModes/DrawingMode";
import InitMode from "components/GameModes/InitMode";
import SubmitMode from "components/GameModes/SubmitMode";

const timers = {
    init: 60000,
    drawing: 90000,
    guessing: 60000,
    loading: 0,
};

const test = undefined;

export default function GameMode({
    pages,
    sketchbookId,
    turn,
    isGameMaster,
    setTime,
}) {
    const { gameId } = useParams();
    let getGameMode = () => {
        let mode = "loading";
        if (pages.length === 0) {
            mode = "init";
        } else if (pages.length > 0 && pages.length <= turn) {
            return pages[pages.length - 1].pageType === "drawing"
                ? "guessing"
                : "drawing";
        } else {
            mode = "submitted";
        }
        if (test) mode = test;
        return mode;
    };

    const lastPage = pages.length > 0 ? pages[pages.length - 1] : {};
    const gameMode = getGameMode();
    const gameProps = {
        timer: timers[gameMode],
        gameId,
        sketchbookId,
        lastPage,
        isGameMaster,
        setTime,
    };

    const selectGameDisplay = () => {
        if (gameMode == "init") {
            return <InitMode {...gameProps} />;
        } else if (gameMode === "drawing") {
            return <DrawingMode {...gameProps} />;
        } else if (gameMode === "guessing") {
            return <GuessingMode {...gameProps} />;
        } else {
            return <SubmitMode isGameMaster={isGameMaster} />;
        }
    };

    return <div>{selectGameDisplay()}</div>;
}
