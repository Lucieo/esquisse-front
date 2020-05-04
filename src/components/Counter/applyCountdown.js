import React, { useState, useEffect } from "react";
import Countdown from "components/Counter/Countdown";
import StopGame from "components/StopGame";
import { TIME_TO_SUBMIT } from "graphQL/subscriptions";
import { useSubscription } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import "./CountDown.css";

const applyCountdown = (WrappedComponent) => {
    const HOC = (props) => {
        const { gameId } = useParams();
        const [finished, setFinished] = useState(false);
        const [submit, setSubmit] = useState(false);

        const timeToSubmit = useSubscription(TIME_TO_SUBMIT, {
            variables: { gameId },
            onSubscriptionData: ({ client, subscriptionData }) => {
                console.log("TIME TO SUBMIT");
                setSubmit(true);
            },
        });

        useEffect(() => {
            const header = document.getElementById("CountDown");
            const sticky = header.offsetTop;
            const scrollCallBack = window.addEventListener("scroll", () => {
                if (window.pageYOffset > sticky) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
            });
            return () => {
                window.removeEventListener("scroll", scrollCallBack);
            };
        }, []);

        const renderCounter = () => {
            return !finished && !submit ? (
                <Countdown
                    setTime={props.setTime}
                    submiter={() => setFinished(true)}
                />
            ) : (
                <StopGame isGameMaster={props.isGameMaster} />
            );
        };
        return (
            <>
                <div className="center" id="CountDown">
                    {renderCounter()}
                </div>
                <WrappedComponent {...props} finished={submit} />
            </>
        );
    };
    return HOC;
};

export default applyCountdown;
