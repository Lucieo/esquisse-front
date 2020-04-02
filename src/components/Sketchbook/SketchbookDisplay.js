import React from 'react';
import CanvasDraw from "react-canvas-draw";
import './Sketchbook.css'

export default function SketchbookDisplay({sketchbook, closeModal, open}){
    const pages = sketchbook.pages
    const initialCreator = pages[0].creator.name
    const initialWord = pages[0].content
    const restOfPages = pages.slice(1)
    console.log(restOfPages)
    return(
        <div className={`modal-wrapper ${open && 'open'}`}>
            <div className="sketchbook-display__wrapper modal">
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
            <div className="modal-overlay" onClick={()=>closeModal()}></div>
        </div>
    )
}