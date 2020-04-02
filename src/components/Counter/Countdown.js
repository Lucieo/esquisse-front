import React, {useEffect} from 'react';
import Counter from 'react-countdown';

export default function Countdown({timer, submiter}){
    const counterAspect = ({ hours, minutes, seconds}) => {
        return(
            <p>
                <i className="material-icons small">access_alarm</i>
                <span>{hours}:{minutes}:{seconds}</span>
            </p>
        )
      };
    return(
    <div style={{fontSize:"2rem"}}>
        <Counter 
        date={Date.now() + timer} 
        renderer={counterAspect}
        onComplete={()=>submiter()}
        />
    </div>
    )
}