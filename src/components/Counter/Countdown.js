import React, { useEffect } from "react";
import Counter from "react-countdown";

export default function Countdown({ timer, submiter, setTime }) {
    const counterAspect = ({ hours, minutes, seconds }) => {
        return (
            <p>
                <i className="material-icons small">access_alarm</i>
                <span>
                    {minutes}:{seconds}
                </span>
            </p>
        );
    };
    return (
        <>
            {setTime && (
                <div className="count-down">
                    <Counter
                        date={setTime}
                        renderer={counterAspect}
                        onComplete={() => submiter()}
                    />
                </div>
            )}
        </>
    );
}
