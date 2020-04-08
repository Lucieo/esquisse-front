import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";
import applyCountdown from 'components/Counter/applyCountdown';
import {SUBMIT_PAGE} from 'graphQL/mutations';
import {useMutation} from '@apollo/react-hooks';

import './GuessingMode.css';

const GuessingPanel = ({lastPage, finished, sketchbookId, gameId})=>{
    const [content, setContent] = useState('')
    const pageType = 'guessing';
    const [submitPage, {loading, error}]= useMutation(SUBMIT_PAGE, {
        variables :{
            content,
            pageType,
            gameId,
            sketchbookId
        },
        onCompleted:()=>{
            console.log('PAGE SUBMITTED FOR SKETCHBOOK', sketchbookId, "with content ", content)
        }
    });

    window.onbeforeunload = function(){
        console.log('LEAVING PAGE')
        submitPage()
    };

    useEffect(() => {
        if(finished){
            submitPage()
        }
    }, [finished]);

        return(
            <div className="center">
                <p>LE DESSIN A INTERPRETER</p>
                <CanvasDraw
                className="guessing-mode__canvas"
                disabled
                hideGrid
                loadTimeOffset={0}
                saveData={lastPage.content}
                hideInterface={true}
                />
                <p>Le mot deviné :</p>
                <input
                    placeholder="Je vois je vois..."
                    disabled={finished}
                    onChange={e=>setContent(e.target.value)}
                />
          </div>
        )

}

export default applyCountdown(GuessingPanel);