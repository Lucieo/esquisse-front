import React from 'react';
import './Drawing.css';

export default function DrawingControls(props){
    return(
        <div className="drawing-controls">
            <div
                className="waves-effect waves-light btn red"
                onClick={() => {props.saveableCanvas.clear();}}
            >
                <i className="material-icons left">delete_forever</i>
                Effacer
            </div>
            <div className="waves-effect waves-light btn"
                onClick={() => {
                    localStorage.setItem(
                    "savedDrawing",
                    props.saveableCanvas.getSaveData()
                    );
                }}
            >
                    <i className="material-icons left">send</i>
                    Envoyer
            </div>

        </div>
    )
}