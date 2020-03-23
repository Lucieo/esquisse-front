import React, {useState} from 'react';
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import {LOGIN_USER} from '../../graphQL/mutations';
import { useHistory } from "react-router-dom";
import {isEmail} from 'validator';

export default function Login(props){
    const client = useApolloClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState('')
    const [isFormValid, setFormValid] = useState(false);
    let history = useHistory();
    
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted({login}) {
            localStorage.setItem("token", login.token);
            client.writeData({ data: { 
                isLoggedIn: true,
                userEmail: login.user.email,
                userName: login.user.name
            } });
            history.push('/');
        },
        onError(...error) {
            const currentError = error[0].toString();
            console.log(currentError)
            if(currentError.indexOf('Invalid Login')>-1){
                setLoginErrors("Mhhh non c'est pas ça essaye encore...")
            }
        }
    })

    const checkForm = ()=>{
        let valid = true;
        let errors = '';
        (!email || !password) && (valid = false);
        if(email && !isEmail(email)){
            valid = false;
            errors="Votre email n'est invalide."
        }
        setLoginErrors(errors);
        setFormValid(valid);
    }

    return(
        <div className="container">
            <h3>Connexion</h3>
            <p className="red-text" style={{minHeight:25}}>{loginErrors}</p>
            <form onSubmit={(e)=>{
                e.preventDefault();
                loginUser({variables:{email, password}});
            }}>
                <input
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                        checkForm();
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        checkForm();
                    }}
                />
                <button className={`btn ${(!password || !email) && 'disabled'}`}>
                    Valider
                    <i className="material-icons left">check</i>
                </button>
            </form>
        </div>
    )
    
}
