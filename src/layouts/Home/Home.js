import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {IS_LOGGED_IN} from '../../graphQL/localQueries';
import BasicHome from './BasicHome';
import ConnectedHome from './ConnectedHome';

export default function Home(){
    const { data } = useQuery(IS_LOGGED_IN);
    return(
        <div>
            <h3>Esquisse Live</h3>
            {
               data.isLoggedIn 
               ? <ConnectedHome/>
               : <BasicHome/>
            }
        </div>
    )
}
