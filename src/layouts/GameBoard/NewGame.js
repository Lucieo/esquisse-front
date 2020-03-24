import React from 'react';
import PlayerItem from '../../components/PlayerItem';
import AdminGameControls from '../../components/AdminGameControls';
import {JOIN_GAME} from '../../graphQL/mutations';
import {useMutation } from "@apollo/react-hooks";


const NewGame = ({players, isGameAdmin=true})=>{
    return(
        <div>
            <h4>Nouvelle partie</h4>
            {
                isGameAdmin &&
                <AdminGameControls/>
            }
            <div>
                <p>Liste des joueurs connectés à cette partie</p>
                <ul className="collection">
                    {
                     players.map((player, index)=>
                        <PlayerItem key={index} player={player}/>)   
                    }
                </ul>
            </div>
        </div>
    )
}

export default NewGame;