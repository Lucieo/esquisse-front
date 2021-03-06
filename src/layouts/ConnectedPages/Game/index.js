import React, { useState, useEffect } from "react";
import GameOver from "./GameOver";
import NewGame from "./NewGame";
import ActiveGame from "./ActiveGame";
import { useParams } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import requireAuth from "components/requireAuth";
import Loading from "components/Loading";
import { GET_GAME_INFO, GET_USER_ID } from "graphQL/queries";
import { GAME_UPDATE } from "graphQL/subscriptions";
import NothingToSee from "components/NothingToSee";
import OnGoingGame from "./OnGoingGame";
import SummerNight from "components/SummerNight";

const Game = (props) => {
    const { gameId } = useParams();
    const [gameInfo, setGameInfo] = useState({});
    const user = useQuery(GET_USER_ID).data;
    const userId = user && user.userId;

    const { data, loading, error } = useQuery(GET_GAME_INFO, {
        variables: { gameId },
        onCompleted({ getGameInfo }) {
            console.log("GET_GAME_INFO ", getGameInfo);
            setGameInfo(getGameInfo);
        },
        fetchPolicy: "network-only",
        onError(...error) {
            console.log(error);
        },
    });

    const gameUpdateSubscription = useSubscription(GAME_UPDATE, {
        variables: { gameId },
        onSubscriptionData: ({ client, subscriptionData }) => {
            const data = subscriptionData.data.gameUpdate;
            console.log("GAME UPDATED SUBSCRIPTION RECEIVED ", data);
            setGameInfo({
                ...gameInfo,
                ...data,
            });
        },
        onError(...error) {
            console.log(error);
        },
    });

    if (loading) return <Loading />;

    const selectGameStatus = ({ status }) => {
        if (status === "new") {
            return (
                <NewGame
                    gameId={gameId}
                    playerslist={gameInfo.players}
                    creatorId={gameInfo.creator}
                />
            );
        } else if (
            status === "active" &&
            gameInfo.players.map((player) => player.id).indexOf(userId) > -1
        ) {
            return <ActiveGame gameInfo={gameInfo} userId={userId} />;
        } else if (status === "active") {
            return <OnGoingGame />;
        } else if (status === "over") {
            return (
                <GameOver gameId={gameId} sketchbooks={gameInfo.sketchbooks} />
            );
        } else {
            return <NothingToSee />;
        }
    };

    return (
        <div className="game-main">
            <SummerNight />
            <div className="container game-main__container">
                {gameInfo && selectGameStatus(gameInfo)}
            </div>
        </div>
    );
};

export default requireAuth(Game);
