import React from 'react';
import PlayerItem from '../../components/PlayerItem';
import AdminGameControls from '../../components/AdminGameControls'


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
                <ul class="collection">
                    {
                     players.map(player=>
                        <PlayerItem player={player}/>)   
                    }
                </ul>
            </div>
        </div>
    )
}

export default NewGame;