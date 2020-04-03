import React, {useState} from 'react';
import {useSubscription} from '@apollo/react-hooks';
import {SUBMIT_UPDATE} from 'graphQL/subscriptions';

export default function GameMaster({gameId, nextTurn, players}){
    const [responses, setResponses] = useState(0)
    const submitUpdate = useSubscription(
        SUBMIT_UPDATE, {variables:{gameId},
        onSubscriptionData: ({client, subscriptionData})=>{
            console.log('SUBMIT SUBSCRIPTION RECEIVED ', subscriptionData.data.submitUpdate);
            if((responses+1)===players.length){
                console.log('ALL RESPONSES RECEIVED')
                setResponses(0);
                nextTurn()
            }
            else{
                setResponses(responses+1);
            }
        }
        }
    );

    return(
        <div></div>
    )
}