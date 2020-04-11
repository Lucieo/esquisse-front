import React from 'react';
import { CirclePicker } from 'react-color';
import DeleteLastStroke from './DeleteLastStroke';
import DeleteAll from './DeleteAll';

export default function DrawingTools({setBrushColor, setBrushRadius, brushRadius, content}){
    return(
        <div className="center drawing-tools">
            <DeleteAll
            content={content}
            />
            <div className="drawing-tools__color">
                <p>Couleur du crayon</p>
                <CirclePicker 
                onChange={ (color, event)=>setBrushColor(color.hex) }
                colors={["#f9cee7", "#FD6C9E", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#2c4c3b", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#f44336", "#B38539", "#795548","#FEFEFE", "#607d8b","#010101" ]}
                color={"#000000"}
                />
            </div>

            <div className="">
                <p>Taille du crayon</p>
                <div className="drawing-tools__brush-btn">
                    <button 
                    className="btn"
                    onClick={()=>setBrushRadius(1)}
                    >Min</button>
                    <button 
                    className="btn"
                    onClick={()=>setBrushRadius(10)}
                    >Med</button>
                    <button 
                    className="btn"
                    onClick={()=>setBrushRadius(20)}
                    >Max</button>
                </div>
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
                <div className={`btn-floating waves-effect waves-light icon ${brushRadius===20 && 'disabled'}`}>
                    <i className="material-icons"
                    onClick={()=>setBrushRadius(brushRadius+1)}
                    >
                        add
                    </i>
                </div>
            </div>
            <DeleteLastStroke
                    content={content}
            />
        </div>
    )
}