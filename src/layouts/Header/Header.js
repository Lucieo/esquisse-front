import React from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from "@apollo/react-hooks";
import {IS_LOGGED_IN} from '../../graphQL/localQueries';
import LogoutButton from '../../components/LogoutBtn';
import './Header.css';

export default function Header(){
    const { data } = useQuery(IS_LOGGED_IN);

    const renderButtons = ()=>{
        if(data.isLoggedIn){
            return(
                <LogoutButton/>
            )
        }
        else{
            return(
                <div>
                    <li><Link to="/signup">Inscription</Link></li>
                    <li><Link to="/login">Connexion</Link></li>
                </div>
            )
        }
    }

    return(
        <nav>
        <div className="nav-wrapper">
            <Link to="/" className="brand-logo left">
                <span className="nav__title">Esquisse Live</span>
                <i className="material-icons">brush</i>
             </Link>
            <ul className="right">
                 {renderButtons()}
            </ul>
        </div>
    </nav>
    )   
}

