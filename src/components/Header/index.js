import React from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from '../../components/LogoutBtn';
import './Header.css';
import requireAuth from 'components/requireAuth';



export default requireAuth(function Header(){
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
})



