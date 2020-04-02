import React, {useState} from "react";
import Countdown from 'components/Counter/Countdown';
import StopGame from 'components/StopGame';

const applyCountdown = (WrappedComponent) => {
    const HOC = (props)=>{
        const [finished, setFinished] = useState(false);
        const renderCounter=()=>{
            return(
                !finished
                ?<Countdown 
                timer={props.timer} 
                submiter={()=>setFinished(true)}/>
                :<StopGame/>

            )
        }
        return (
            <>
            <div className="center">
                {renderCounter()}
            </div>
            <WrappedComponent
                {...props}
                finished={finished}
            />
            </>
        );
    }
    return HOC;
};

export default applyCountdown;

