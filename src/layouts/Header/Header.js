import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from "@apollo/react-hooks";
import {IS_LOGGED_IN} from '../../graphQL/localQueries';
import LogoutButton from '../../components/LogoutBtn';
import './Header.css';

export default function Header(){
    const { data } = useQuery(IS_LOGGED_IN);

    if(data.isLoggedIn){
        return(
            <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">
                    <span className="nav__title">Esquisse Live</span>
                    <i className="material-icons">brush</i>
                 </Link>
                <ul className="right">
                    <LogoutButton/>
                </ul>
            </div>
        </nav>
        )   
    }
    return(
        <div className="header__notConnected"></div>
    )
}

