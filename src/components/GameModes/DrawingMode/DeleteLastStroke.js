import React from 'react';
import './Drawing.css';

export default function DeleteLastStroke({content}){
    return(
        <div className="drawing-controls center">
            <div
                className="waves-effect waves-light btn"
                onClick={() => {content.undo();}}
            >
                {/* <i className="material-icons left">arrow_back</i> */}
                Revenir en arrière
            </div>
        </div>
    )
}