import React, {useEffect} from 'react';
import Counter from 'react-countdown';

export default function Countdown({timer, submiter}){
    const counterAspect = ({ hours, minutes, seconds}) => {
        return(
            <p>
                <i className="material-icons">access_alarm</i>
                <span>{hours}:{minutes}:{seconds}</span>
            </p>
        )
      };
    return(
    <div>
        <Counter 
        date={Date.now() + timer} 
        renderer={counterAspect}
        onComplete={()=>submiter()}
        />
    </div>
    )
}