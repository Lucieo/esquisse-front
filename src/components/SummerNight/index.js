import React, {useState} from 'react';
import Bg from 'images/summer-night.jpg';
import './SummerNight.css';
import SummerSound from 'sounds/nightSounds.mp3';
import OpenBottle from 'sounds/open_bottle.mp3';
import BbqSound from 'sounds/bbqsound.mp3';
import CrispsSound from 'sounds/chips.mp3';
import MosquitoSound from 'sounds/moustique.mp3';
import {ReactComponent as Beer} from 'images/beer.svg';
import {ReactComponent as Bbq} from 'images/bbq.svg';
import {ReactComponent as Bowl} from 'images/bowl.svg';
import {ReactComponent as Mosquito} from 'images/insecticide.svg';

export default function SummerNight(){
    const [summerNightMode, setSummerNightMode] = useState(false);

    const playSound = (soundId)=>{
        const audioEl = document.getElementById(soundId)
        audioEl.play()
    }
    return(
        <>  
            <div className="summer-mode__background"  style={summerNightMode ? {background: `url(${Bg})`}:{}}>
            </div>
            {
                summerNightMode && 
                <div style={{display:"none"}}>
                    <audio src={SummerSound} autoPlay loop/>
                    <audio id="bottleSound" src={OpenBottle}/>
                    <audio id="bbqSound" src={BbqSound}/>
                    <audio id="crispsSound" src={CrispsSound}/>
                    <audio id="mosquitoSound" src={MosquitoSound}/>
                </div>

            }
            <div className="container summer-mode">
                <div className="switch">
                    <label>
                    <input type="checkbox"
                        onClick={()=>setSummerNightMode(!summerNightMode)}
                    />
                    <span className="lever">
                    </span>
                    Mode Apéro en Terrasse
                    </label>
                </div>
                {
                    summerNightMode &&
                    <>
                    <h6 className="center">Summer Simulator 2020</h6>
                    <div className="summer-mode__simulator">
                        <div className="summer-mode__simulator-item center"
                        onClick={()=>playSound("bottleSound")}>
                            <Beer className="summer-mode__svg"/>
                            <span>Prends toi une bière</span>
                        </div>
                        <div className="summer-mode__simulator-item center"
                        onClick={()=>playSound("bbqSound")}
                        >
                            <Bbq className="summer-mode__svg"/>
                            <span>Surveille le barbecue</span>
                        </div>
                        <div className="summer-mode__simulator-item center"
                        onClick={()=>playSound("crispsSound")}
                        >
                            <Bowl className="summer-mode__svg"/>
                            <span>Des chips?</span>
                        </div>
                        <div className="summer-mode__simulator-item center"
                        onClick={()=>playSound("mosquitoSound")}
                        >
                            <Mosquito className="summer-mode__svg"/>
                            <span>Remets de l'anti-moustique</span>
                        </div>
                    </div>
                    </>
                }
            </div>

        </>
    )
}