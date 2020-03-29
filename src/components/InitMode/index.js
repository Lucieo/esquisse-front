import React from "react";

export default function InitMode(){
    return(
        <div>
            <p>Indiquez un mot pour commencer la partie</p>
            <input
                placeholder="Mot Initial"
                type="text"
            />
        </div>
    )
}