import React, {useState} from 'react';
import CanvasDraw from "react-canvas-draw";
import DrawingTools from './DrawingTools';

export default function DrawingPanel(props){
    const [brushColor, setBrushColor]=useState("#2196f3");
    const [brushRadius, setBrushRadius]=useState(2);
    const [saveableCanvas, setSaveableCanvas]=useState('');

        return(
            <div>
                <div class="center">
                    <p>LE MOT A DESSINER</p>
                    <h3>{props.word}</h3>
                </div>
                <DrawingTools
                    setBrushColor={setBrushColor}
                    setBrushRadius={setBrushRadius}
                    saveableCanvas={saveableCanvas}
                    brushRadius={brushRadius}
                />
                <CanvasDraw
                    ref={canvasDraw => setSaveableCanvas(canvasDraw)}
                    brushRadius= {brushRadius}
                    lazyRadius={2}
                    brushColor={brushColor}
                />
            </div>
        )
}
