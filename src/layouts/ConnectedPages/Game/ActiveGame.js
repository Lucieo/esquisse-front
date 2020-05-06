import React, { useState } from "react";
import requireAuth from "components/requireAuth";
import { useQuery } from "@apollo/react-hooks";
import Loading from "components/Loading";
import { GET_SKETCHBOOK_DETAILS } from "graphQL/queries";
import GameModes from "components/GameModes";

const ActiveGame = ({ gameInfo, userId }) => {
    const { turn, players, sketchbooks } = gameInfo;
    const [pages, setPages] = useState();

    const getSketchbookId = () => {
        const sketchbookMaxIndex = sketchbooks.length - 1;
        const currentUserIndex = players.map((el) => el.id).indexOf(userId);
        let sketchbookIndex = currentUserIndex + turn;
        if (sketchbookIndex > sketchbookMaxIndex) {
            sketchbookIndex = sketchbookIndex - sketchbooks.length;
        }
        return sketchbooks[sketchbookIndex].id;
    };
    const sketchbookId = getSketchbookId();

    const { data, loading } = useQuery(GET_SKETCHBOOK_DETAILS, {
        variables: {
            sketchbookId,
        },
        fetchPolicy: "network-only",
        onCompleted({ getSketchbookInfo }) {
            console.log("GETTING SKETCHBOOK", getSketchbookInfo);
            setPages(getSketchbookInfo.pages);
        },
        onError(...error) {
            console.log(error);
        },
    });

    if (loading) return <Loading />;

    return (
        <div className="active-game">
            {pages && (
                <GameModes
                    pages={pages}
                    sketchbookId={sketchbookId}
                    turn={turn}
                    isGameMaster={userId === gameInfo.creator}
                    setTime={gameInfo.timer}
                    turn={gameInfo.turn}
                />
            )}
        </div>
    );
};

export default requireAuth(ActiveGame);
