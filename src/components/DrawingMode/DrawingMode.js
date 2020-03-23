import React, {useState} from 'react';
import CanvasDraw from "react-canvas-draw";
import DrawingTools from './DrawingTools';
import DrawingControls from './DrawingControls';
import './Drawing.css';
import Countdown from 'react-countdown';


export default function DrawingPanel(props){
    const [brushColor, setBrushColor]=useState("#2196f3");
    const [brushRadius, setBrushRadius]=useState(2);
    const [saveableCanvas, setSaveableCanvas]=useState('');

        return(
            <div>
                <div class="center">
                    <p>LE MOT A DESSINER EST</p>
                    <h3>{props.word}</h3>
                </div>
                <DrawingTools
                    setBrushColor={setBrushColor}
                    setBrushRadius={setBrushRadius}
                    saveableCanvas={saveableCanvas}
                    brushRadius={brushRadius}
                />
                <DrawingControls
                    saveableCanvas={saveableCanvas}
                />
                <div className="drawing-mode__countdown">
                    <i className="material-icons">access_alarm</i>
                    <Countdown date={Date.now() + 100000} />
                </div>
                <CanvasDraw
                    ref={canvasDraw => setSaveableCanvas(canvasDraw)}
                    brushRadius= {brushRadius}
                    lazyRadius={2}
                    brushColor={brushColor}
                    className="drawing-mode__canvas"
                />
                
            </div>
        )
}
