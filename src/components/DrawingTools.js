import React from 'react';
import { CirclePicker } from 'react-color';

export default function DrawingTools({saveableCanvas, setBrushColor, setBrushRadius, brushRadius}){
    return(
        <>
        <div
        className="waves-effect waves-light btn red"
        onClick={() => {saveableCanvas.clear();}}
        >
            <i className="material-icons left">delete_forever</i>
            Effacer
        </div>

    <div>
        <p>Couleur du crayon</p>
        <CirclePicker onChange={ (color, event)=>setBrushColor(color.hex) }/>
    </div>

    <div>
        <p>Taille du crayon</p>
        <div className={`btn-floating waves-effect waves-light ${brushRadius===1 && 'disabled'}`}>
            <i className="material-icons"
            onClick={()=>setBrushRadius(brushRadius-1)}
            >
                remove
            </i>
        </div>
        <span className="canvas__brush-size">
            {brushRadius}
        </span>
        <div className={`btn-floating waves-effect waves-light ${brushRadius===10 && 'disabled'}`}>
            <i className="material-icons"
            onClick={()=>setBrushRadius(brushRadius+1)}
            >
                add
            </i>
        </div>
    </div>

    <div className="waves-effect waves-light btn"
        onClick={() => {
            localStorage.setItem(
              "savedDrawing",
              saveableCanvas.getSaveData()
            );
          }}
        >
            <i className="material-icons left">send</i>
            Envoyer
    </div>
    </>
    )
}