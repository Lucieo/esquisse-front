import React from 'react';
import CanvasDraw from "react-canvas-draw";


export default function GuessingPanel(props){

        return(
            <>
                <p>LE DESSIN A INTERPRETER</p>
                <CanvasDraw
                disabled
                hideGrid
                loadTimeOffset={0}
                saveData={localStorage.getItem("savedDrawing")}
                hideInterface={true}
                />
                <p>Le mot :</p>
                <form>
                    <input
                        placeholder="Je vois je vois..."
                    />
                    <button className="btn">Envoyer</button>
                </form>
          </>
        )

}
