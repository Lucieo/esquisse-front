import React from 'react';
import {Link} from 'react-router-dom';
import Wrong from 'images/wrong.png'

export default function NothingToSee(){
    return(
        <div className="center">
            <h3>Rien à voir ici circulez!</h3>
            <p>Cette partie a été abandonnée vous ne pouvez pas y accéder.</p>
            <div>
                <img src={Wrong} alt="stop"/>
            </div>
            <Link to="/">
                <button className="btn">Revenir à la civilisation</button>
            </Link>
        </div>
    )
}