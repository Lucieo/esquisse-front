import React from 'react';
import { CirclePicker } from 'react-color';

export default function DrawingTools({setBrushColor, setBrushRadius, brushRadius}){
    return(
        <div className="row center drawing-tools">
            <div className="col s12 m8">
                <p>Couleur du crayon</p>
                <CirclePicker 
                onChange={ (color, event)=>setBrushColor(color.hex) }/>
            </div>

            <div className="col s12 m4">
                <p>Taille du crayon</p>
                <div className={`btn-floating waves-effect waves-light icon ${brushRadius===1 && 'disabled'}`}>
                    <i className="material-icons"
                    onClick={()=>setBrushRadius(brushRadius-1)}
                    >
                        remove
                    </i>
                </div>
                <span className="brush-size">
                    {brushRadius}
                </span>
                <div className={`btn-floating waves-effect waves-light icon ${brushRadius===10 && 'disabled'}`}>
                    <i className="material-icons"
                    onClick={()=>setBrushRadius(brushRadius+1)}
                    >
                        add
                    </i>
                </div>
            </div>
        </div>
    )
}