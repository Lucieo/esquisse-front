import React from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from '../../components/LogoutBtn';
import './Header.css';
import requireAuth from 'components/requireAuth';
import {CURRENT_USER} from 'graphQL/queries';
import {useQuery} from '@apollo/react-hooks';



export default requireAuth(function Header(){
    const {data, loading, error}= useQuery(CURRENT_USER);
    const name = data && data.currentUser.name
        return(
            <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">
                    <span className="nav__title">Esquisse Live</span>
                    <i className="material-icons">brush</i>
                 </Link>
                <ul className="right nav__right-menu">
                    <LogoutButton/>
                    <span>hello {name}</span>
                </ul>
            </div>
        </nav>
        )   
})



