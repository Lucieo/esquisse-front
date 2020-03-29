import React from 'react';
import {useQuery, useApolloClient} from '@apollo/react-hooks';
import {CURRENT_USER} from 'graphQL/queries';
import './Home.css';
import Loading from 'components/Loading';
import CreateGame from 'components/CreateGame';
import {Link} from 'react-router-dom';
import requireAuth from 'components/requireAuth';
import gql from 'graphql-tag';

const GET_USERID = gql`
{
    userId @client
}
`

function Home(){
    const client = useApolloClient();
    const { data, loading, error } = useQuery(CURRENT_USER);

    if(loading) return <Loading/>

    const user = data.currentUser
    return(
        <div className="center connected-home">
            <i className="material-icons large connected-home__icon" style={{color: user.iconColor, borderColor: user.iconColor}}>{user.icon}</i>
            <p>Bienvenue</p>
            <h4>{user.name}</h4>
            <p>Profil</p>
            <Link to="/profile" className="btn">
                Modifier Mon profil
            </Link>
            <CreateGame/>
        </div>
    )
}

export default requireAuth(Home);