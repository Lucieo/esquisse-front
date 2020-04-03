import React from 'react';
import './SketchbookDisplay.css';
import CanvasDraw from "react-canvas-draw";


export default function SketchbookDisplay({sketchbook}){
    const initialCreator = sketchbook.pages[0].creator.name
    const initialWord = sketchbook.pages[0].content
    const restOfPages = sketchbook.pages.slice(1)
    return(
        <div>
            <div className="">
                <h3>{initialWord}</h3>
                <p>proposé par {initialCreator}</p>
            </div>
            <div className="">
                {
                    restOfPages.map(
                        (page, index)=>{
                            if(page.pageType==="drawing"){
                                console.log(page.content)
                                return(
                                <div 
                                key={index}
                                >
                                    <hr/>                                                                <p>Le dessin de {page.creator.name}</p>
                                    <CanvasDraw
                                        className="sketchbook__drawing"
                                        disabled
                                        hideGrid
                                        loadTimeOffset={0}
                                        saveData={page.content}
                                        hideInterface={true}
                                    />
                                </div>   
                                )              
                            }
                            else{
                            return(
                                <div key={index}>
                                    <hr/>
                                    <p>L'interprétation de {page.creator.name}</p>
                                    <p>{page.content}</p>
                                </div>
                            )
                            }
                        }
                    )
                }
            </div>
        </div>
    )
}