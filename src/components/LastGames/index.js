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
            <p>VOTRE DERNIÈRE PARTIE</p>
            <i>attention les parties sont effacées après 24h</i>
            {
                loading &&
                <div>
                    <img className="last-games__loader" src={gearLoader}/>
                </div>

            }
            {
                data && data.getLastUserGames.length>0
                ? data.getLastUserGames.map((game, index)=>{
                    return(
                        <div className="last-games__game-wrapper"
                        key={index}
                        >
                        <Link to={"/game/"+game.id}>
                            <div className="last-games__game-border">
                                <div className="last-games__title">
                                    <span>Voir la partie</span>
                                    <i className="material-icons">remove_red_eye</i>
                                </div>
                                <div>
                                    {
                                        game.sketchbooks.map((sketchbook, index)=> <span key={index}>{(index!==0) && " /"} {sketchbook.pages[0].content}</span> )
                                    }
                                </div>
                            </div>
                        </Link>
                        </div>
                    )
                })
                :<p>aucune partie disponible</p>
            }
        </div>
    )
}