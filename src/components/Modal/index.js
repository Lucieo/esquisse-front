import React from 'react';
import './Modal.css';

export default function Modal(props){
    return(
        <div className={`modal-wrapper ${props.open && 'open'}`}>
            <div className="sketchbook-display__wrapper modal">
                {props.children}
            </div>
        <div className="modal-overlay" onClick={()=>props.closeModal()}></div>
    </div>

    )
}