import React from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from '../../components/LogoutBtn';
import './Header.css';
import requireAuth from 'components/requireAuth';
import {CURRENT_USER} from 'graphQL/queries';
import {useQuery} from '@apollo/react-hooks';
import {useHistory} from 'react-router-dom';



export default requireAuth(function Header(){
    const history = useHistory();
    const {data, loading, error}= useQuery(CURRENT_USER);
    if(error && error.toString().indexOf('Not Authenticated')>-1){
        localStorage.clear();
        window.location.reload();
        history.push('/');
    }
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



