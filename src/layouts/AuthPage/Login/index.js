import React, {useState} from 'react';
import {useMutation, useApolloClient } from "@apollo/react-hooks";
import {isEmail} from 'validator';
import gql from 'graphql-tag';
import './Login.css';


const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user{
            email
            name
            id
        }
    }
}
`;

export default function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginErrors, setLoginErrors] = useState('')
    const [isFormValid, setFormValid] = useState(false);

    const client = useApolloClient();
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted({login}) {
            localStorage.setItem("esquisse-token", "Bearer "+login.token);
            client.writeData({ data: { isLoggedIn: true } });
            window.location.reload();
        },
        onError(...error) {
            const currentError = error[0].toString();
            if(currentError.indexOf('Invalid Login')>-1){
                setLoginErrors("C'est pas ça retente ta chance!")
            }
        }
    })

    const checkForm = (value, setter)=>{
        setter(value);
        let valid = true;
        let errors = '';
        if(value && !isEmail(value)){
            valid = false;
            errors="Votre email n'est invalide."
        }
        (!value || !password) && (valid = false);
        setLoginErrors(errors);
        setFormValid(valid);
    }

    return(
        <div className="container">
            <p>par ici pour se connecter</p>
            <p className="red-text" style={{minHeight:25}}>{loginErrors}</p>
            <form onSubmit={(e)=>{
                e.preventDefault();
                loginUser({variables:{email, password}});
            }}>
                <input
                    placeholder="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=>{
                        checkForm(e.target.value, setEmail);
                    }}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className={`btn ${(!password || !email) && 'disabled'} login__validate`}>
                    Valider
                    <i className="material-icons left">check</i>
                </button>
                <p className="login__switch" onClick={()=>props.switchMode()}>Pas de compte? S'inscrire</p>

            </form>
        </div>
    )
    
}
