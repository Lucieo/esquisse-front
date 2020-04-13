import React, {useState} from 'react';
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import {SIGNUP_USER} from '../../../graphQL/mutations';
import {isEmail, isLength} from 'validator';
import './Signup.css';

export default function SignUp(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [signupErrors, setSignupErrors ]= useState('');
    const [isFormValid, setFormValid] = useState(false);
    const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted() {
            window.location.reload()
        }
    });

    const checkForm = (newValue, valueName, setter)=>{
        setter(newValue);
        let valid = true;
        let errors = '';

        if(valueName==="email" && !isEmail(newValue)){
            valid = false;
            errors="Votre email n'est invalide."
        }
        else if(valueName==="password" && !isLength(newValue, {min:6})){
            valid = false;
            errors="Choisissez un mot de passe de 6 charactères minimum."
        }
        else if(valueName==="name" && !isLength(newValue, {min:6})){
            valid = false;
            errors="Choisissez un nom de 6 charactères minimum."
        }

        (!email || !password || !name) && (valid = false);

        setSignupErrors(errors);
        setFormValid(valid);
    }

    return(
        <div className="container">
            <p>se créer un compte</p>
            <p className="red-text" style={{minHeight:25}}>{signupErrors}</p>
            <form 
                onSubmit={(e)=>{
                e.preventDefault();
                signupUser({variables:{email, password, name}});
            }}>
            <input
                placeholder="nom"
                name="username"
                value={name}
                onChange={(e)=>{checkForm(e.target.value, 'name', setName)}}
            />
            <input
                placeholder="email"
                type="email"
                name="email"
                value={email}
                onChange={(e)=>{checkForm(e.target.value, 'email', setEmail)}}
            />
            <input
                type="password"
                name="password"
                placeholder="mot de passe"
                value={password}
                onChange={(e)=>{checkForm(e.target.value, 'password', setPassword)}}
            />

            <button className={`btn ${!isFormValid && 'disabled'} signup__validate`}>
                Valider
                <i className="material-icons left">check</i>
            </button>
            <p className="signup__switch" onClick={()=>props.switchMode()}>Déjà un compte? Se connecter</p>

        </form>
        </div>
    )
}
