import React, {useState} from 'react';
import requireAuth from '../../../components/requireAuth';
import { useQuery, useMutation } from "@apollo/react-hooks";
import {CURRENT_USER} from '../../../graphQL/queries';
import {MODIFY_USER} from '../../../graphQL/mutations';
import IconSelector from '../../../components/ProfileItems/IconSelector';
import { CirclePicker } from 'react-color';
import './Profil.css';
import { useHistory } from "react-router-dom";


const Profil = ()=>{
    const [icon, setIcon] = useState('tag_faces');
    const [iconColor, setIconColor] = useState('black-text');
    const [name, setName] = useState('');
    let history = useHistory();

    const { data, loading, error } = useQuery(
        CURRENT_USER,
        { fetchPolicy: "network-only", 
            onCompleted(data) {
                setName(data.currentUser.name)
                setIcon(data.currentUser.icon || 'tag_faces')
                setIconColor(data.currentUser.iconColor || 'blue-text')            
            }
        }
    );

    const [modifyUser , {modifyData}] = useMutation(MODIFY_USER, {
        variables: {name, icon, iconColor},
        onCompleted(response){
            history.push('/')
        },
        refetchQueries: [{
            query: CURRENT_USER
        }]
    })

    
    if(loading) return <></>

    return(
        <div className="container profile">
            <div className="row">
                <div className="col s6 center">
                    <i className={`material-icons large ${iconColor}`}
                    style={{color:iconColor}}
                    >{icon}</i>
                </div>
                <div className="col s6">
                    <h4>Mon Profil</h4>
                    <input
                        placeholder="nom"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        maxLength={20}
                    />
                </div>
                <div>
                    <p>Mon avatar</p>
                    <IconSelector
                        setIcon={setIcon}
                        selectedIcon={icon}
                    />
                    <p>Couleur</p>
                    <CirclePicker
                        onChange={ (color, event)=>setIconColor((color.hex))}
                    />
                </div>
                <div className="center profil__save-btn">
                    <button 
                    className="btn"
                    onClick = {()=>modifyUser()}
                    >Enregistrer</button>
                </div>
            </div>

        </div>
    )
}

export default requireAuth(Profil);