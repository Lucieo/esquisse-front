import React, {useEffect} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {IS_LOGGED_IN} from '../graphQL/localQueries';
import { useHistory } from "react-router-dom";

const requireAuth = (WrappedComponent) => {
    const HOC = (props)=>{
        const { data } = useQuery(IS_LOGGED_IN);
        let history = useHistory();
        useEffect(() => {
            console.log(data)
           !data.isLoggedIn && history.push('/login')
        });
        return (
        <WrappedComponent
            {...props}
        />
        );
    }
    return HOC;
};

export default requireAuth;