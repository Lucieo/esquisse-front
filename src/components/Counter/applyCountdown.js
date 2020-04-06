import React, {useState} from "react";
import Countdown from 'components/Counter/Countdown';
import StopGame from 'components/StopGame';
import {TIME_TO_SUBMIT} from 'graphQL/subscriptions';
import {useSubscription} from '@apollo/react-hooks';
import {useParams} from 'react-router-dom';

const applyCountdown = (WrappedComponent) => {
    const HOC = (props)=>{
        const {gameId} = useParams();
        const [finished, setFinished] = useState(false);
        const [submit, setSubmit] = useState(false);

        const timeToSubmit = useSubscription(
            TIME_TO_SUBMIT, {variables:{gameId},
            onSubscriptionData: ({client, subscriptionData})=>{
                console.log('TIME TO SUBMIT')
                setSubmit(true)
            }
            }
        );

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
                finished={submit}
            />
            </>
        );
    }
    return HOC;
};

export default applyCountdown;

