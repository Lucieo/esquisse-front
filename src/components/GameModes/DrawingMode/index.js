import React, {useState, useEffect} from 'react';
import CanvasDraw from "react-canvas-draw";
import DrawingTools from './DrawingTools';
import DrawingControls from './DrawingControls';
import applyCountdown from 'components/Counter/applyCountdown';
import {SUBMIT_PAGE} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';
import './Drawing.css';


const DrawingMode=({lastPage, finished, gameId, sketchbookId})=>{
    const [brushColor, setBrushColor]=useState("#2196f3");
    const [brushRadius, setBrushRadius]=useState(2);
    const [content, setContent]=useState('');

    const pageType = 'drawing';
    const [submitPage, {loading, error}]= useMutation(SUBMIT_PAGE, {
        variables :{
            content: content && content.getSaveData(),
            pageType,
            gameId,
            sketchbookId
        },
        onCompleted:()=>{
            console.log('PAGE SUBMITTED FOR SKETCHBOOK', sketchbookId, "with content ", content)
        }
    });

    useEffect(() => {
        if(finished){
            submitPage()
        }
    }, [finished]);

        return(
            <div>
                <div className="center">
                    <p>LE MOT A DESSINER EST</p>
                    <h3>{lastPage.content}</h3>
                </div>
                <DrawingTools
                    setBrushColor={setBrushColor}
                    setBrushRadius={setBrushRadius}
                    content={content}
                    brushRadius={brushRadius}
                />
                <DrawingControls
                    content={content}
                />
                <CanvasDraw
                    ref={canvasDraw => setContent(canvasDraw)}
                    brushRadius= {brushRadius}
                    lazyRadius={2}
                    brushColor={brushColor}
                    className="drawing-mode__canvas"
                    disabled={finished}
                    hideGrid={finished}
                />
                
            </div>
        )
}

export default applyCountdown(DrawingMode)