import React from "react";
import { useParams } from "react-router-dom";
import GuessingMode from "components/GameModes/GuessingMode";
import DrawingMode from "components/GameModes/DrawingMode";
import InitMode from "components/GameModes/InitMode";
import Loading from "components/Loading";

const test = undefined;

export default function GameMode({ pages, turn, isGameMaster, setTime }) {
    const currentPageIndex =
        turn > pages.length - 1 ? turn - pages.length : turn;
    const currentPage = pages[currentPageIndex];

    const getLastPage = (currentPage, currentPageIndex) => {
        let lastPage = currentPageIndex > 0 && pages[currentPageIndex - 1];
        if (lastPage.content === "" && currentPageIndex - 3 >= 0) {
            lastPage = pages[currentPageIndex - 3];
        }
        return lastPage;
    };

    const lastPage = getLastPage(currentPage, currentPageIndex);
    console.log(isGameMaster, "isGameMaster");
    const gameProps = {
        turn,
        isGameMaster,
        setTime,
        pageId: currentPage.id,
        lastPage,
    };

    const gameMode = currentPage.pageType;
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
