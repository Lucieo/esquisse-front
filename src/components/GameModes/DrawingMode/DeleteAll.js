import React from 'react';
import './Drawing.css';

export default function DrawingControls({content}){
    return(
        <div className="drawing-controls center">
            <div
                className="waves-effect waves-light btn red"
                onClick={() => {content.clear();}}
            >
                <i className="material-icons left">delete_forever</i>
                Tout Effacer
            </div>
        </div>
    )
}