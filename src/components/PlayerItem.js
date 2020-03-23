import React from 'react';

export default function PlayerItem({player}){
    return(
        <>
            <li class="collection-item">
                <i      className="material-icons">tag_faces</i>
                <span>{player.name}</span>
            </li>
        </>
    )
}