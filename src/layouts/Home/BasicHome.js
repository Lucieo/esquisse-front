import React,  {useState} from 'react';
import CrayonsBG from '../../images/crayons.jpeg';
import {ReactComponent as Logo} from '../../images/pencil.svg';
import './Home.css';
import Login from '../Login/Login';
import SignUp from '../Signup/Signup';
import Sloggan from '../../components/Sloggan';

export default function BasicHome(){
    const [mode, setMode] = useState('login');
    return(
        <div className="basic-home" style={{background: `url(${CrayonsBG})`}}>
            <Logo className="basic-home__logo"/>
            <h3 className='basic-home__title'>Esquisse Live</h3>
            <div className="basic-home__action">
                <h5 className="center">
                    <Sloggan/>
                </h5>
                {
                    mode==="login"
                    ? <Login switchMode={()=>setMode('signup')}/>
                    : <SignUp switchMode={()=>setMode('login')}/>
                }
            </div>
        </div>
    )
}