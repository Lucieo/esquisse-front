import React from "react";
import { useParams } from "react-router-dom";
import GuessingMode from "components/GameModes/GuessingMode";
import DrawingMode from "components/GameModes/DrawingMode";
import InitMode from "components/GameModes/InitMode";
import Loading from "components/Loading";

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
        } else if (pages.length % 2 === 0) {
            mode = "guessing";
        } else if (pages.length % 2 !== 0) {
            mode = "drawing";
        }
        if (test) mode = test;
        return mode;
    };

    const lastPage = pages.length > 0 ? pages[pages.length - 1] : {};
    const gameMode = getGameMode();
    const gameProps = {
        gameId,
        turn,
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
            return <Loading />;
        }
    };

    return <div>{selectGameDisplay()}</div>;
}
