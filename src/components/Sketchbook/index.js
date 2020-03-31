import React from 'react';
import CanvasDraw from "react-canvas-draw";
import './Sketchbook.css'

export default function Sketchbook({sketchbook}){
    const pages = sketchbook.pages
    const initialCreator = pages[0].creator.name
    const initialWord = pages[0].content
    const restOfPages = pages.slice(1)
    console.log(restOfPages)
    return(
        <li>
            <div className="collapsible-header">{initialWord} - proposé par {initialCreator}</div>
            <div className="">
                {
                    restOfPages.map(
                        (page, index)=>{
                            if(page.pageType==="drawing"){
                                return(
                                <div 
                                key={index}
                                >
                                                                                        <p>Le dessin de {page.creator.name}</p>
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
                                    <p>{page.content}L'interprétation de {page.creator.name}</p>
                                    <p>{page.content}</p>
                                </div>
                            )
                            }
                        }
                    )
                }
            </div>
        </li>
    )
}