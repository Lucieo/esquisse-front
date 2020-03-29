import React from 'react';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import {CURRENT_USER} from 'graphQL/queries';
import Header from 'components/Header';

export default function ConnectedPageContainer(props){
    const client = useApolloClient();
    const { data, loading, error } = useQuery(
        CURRENT_USER,
        {
            onCompleted({currentUser}){
                client.writeData({
                    data:{
                        userId:currentUser.id,
                    }
                })
            }
        }
    );
    return(
        <>
        <Header/>
        <div>{props.children}</div>
        </>
    )
}