import React from 'react';

export default function PlayerItem({player, admin}){
    return(
        <>
            <li className="collection-item">
                <i className="material-icons" style={{color: player.iconColor}}>{player.icon}</i>
                <span>{player.name}</span>  {admin && <span> - GAME MASTER</span>}
            </li>
        </>
    )
}