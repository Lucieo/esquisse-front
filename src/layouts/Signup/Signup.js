import React, {useState} from 'react';
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import {SIGNUP_USER} from '../../graphQL/mutations';
import { useHistory } from "react-router-dom";
import {isEmail, isLength} from 'validator';

export default function SignUp(){
    const client = useApolloClient();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signupErrors, setSignupErrors ]= useState('');
    const [isFormValid, setFormValid] = useState(false);
    let history = useHistory();
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted() {
            history.push('/login');
        }
    });

    const checkForm = ()=>{
        let valid = true;
        let errors = '';
        (!email || !password || !name) && (valid = false);
        if(email && !isEmail(email)){
            valid = false;
            errors="Votre email n'est invalide."
        }
        else if(password && !isLength(password, {min:6})){
            valid = false;
            errors="Choisissez un mot de passe de 6 charactères minimum."
        }
        else if(name && !isLength(name, {min:6})){
            valid = false;
            errors="Choisissez un nom de 6 charactères minimum."
        }
        setSignupErrors(errors);
        setFormValid(valid);
    }

    return(
        <div className="container">
            <h3>Inscription</h3>
            <p className="red-text" style={{minHeight:25}}>{signupErrors}</p>
            <form 
                onSubmit={(e)=>{
                e.preventDefault();
                signupUser({variables:{email, password, name}});
            }}>
            <input
                placeholder="nom"
                value={name}
                onChange={(e)=>{setName(e.target.value); checkForm()}}
            />
            <input
                placeholder="email"
                type="email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value); checkForm()}}
            />
            <input
                type="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e)=>{setPassword(e.target.value); checkForm()}}
            />

            <button className={`btn ${!isFormValid && 'disabled'}`}>
                Valider
                <i className="material-icons left">check</i>
            </button>

        </form>
        </div>
    )
}
