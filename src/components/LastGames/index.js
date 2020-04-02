import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {LAST_GAMES} from 'graphQL/queries';
import {Link} from 'react-router-dom';
import gearLoader from 'images/gearLoader.gif'
import './LastGames.css';

export default function LastGames(){
    const { data, loading, error } = useQuery(LAST_GAMES);

    return(
        <div className="last-games">
            <p>VOS DERNIERES PARTIES</p>
            {
                loading &&
                <div><img className="last-games__loader" src={gearLoader}/></div>

            }
            {
                data && data.getLastUserGames.length>0
                ? data.getLastUserGames.map((game, index)=>{
                    return(
                        <div className="last-games__game-wrapper"
                        key={index}
                        >
                            <div className="last-games__game-border">
                                <span>Partie {index+1}</span>
                                <Link to={"/game/"+game.id}>
                                    <i className="material-icons">remove_red_eye</i>
                                </Link>
                            </div>
                        </div>
                    )
                })
                :<p>aucune partie jouée pour le moment</p>
            }
        </div>
    )
}