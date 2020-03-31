import React, {useState} from "react";
import Countdown from 'components/Counter/Countdown';

const applyCountdown = (WrappedComponent) => {
    const HOC = (props)=>{
        const [finished, setFinished] = useState(false);
        const renderCounter=()=>{
            return(
                !finished
                ?<Countdown 
                timer={props.timer} 
                submiter={()=>setFinished(true)}/>
                :
                <p>
                    <i className="material-icons">do_not_disturb_on</i>
                    <span>TERMINÉ - HAUT LES MAINS!</span>
                </p>
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

