import React, { useState } from 'react';
import {useQuery} from '@apollo/react-hooks';
import endGif from 'images/artist.gif';
import Loading from 'components/Loading';
import Modal from 'components/Modal';
import SketchbookDisplay from 'components/SketchbookDisplay';
import {GET_ALL_SKETCHBOOKS} from 'graphQL/queries';
import './Game.css';
import {Link} from 'react-router-dom';


const GameOver = ({gameId})=>{
    const [sketchbook, setSketchbook] = useState();
    const [openedModal, setOpenedModal] = useState(false);
    const {data, loading, error} = useQuery(GET_ALL_SKETCHBOOKS, {
        variables:{gameId}
    })

    if(loading) return <Loading/>
    const sketchbooks = data && data.getAllSketchbooks
    return(
        <div className="center">
            <h2>NOICE!</h2>
            <p>Le jeu est maintenant terminé.</p> 
            <p>Découvrez ci dessous les performances artistiques de vos amis!</p>
            <div><Link to={"/pdf/"+gameId}><button className="btn game-over__pdf-btn">Par ici pour la version pdf</button></Link></div>
            <img className="game-over__gif" src={endGif} alt="artist"/>
            <div>
                {
                sketchbooks &&
                sketchbooks.map((sketchbook, index)=>{
                    return(
                        <div key={index} className="game-over__result-bnt-wrapper">
                            <button 
                            className="btn game-over__result-btn" 
                            onClick={()=>{
                                setSketchbook(sketchbook);
                                setOpenedModal(true)
                            }}
                            >{sketchbook.pages[0].creator.name} - {sketchbook.pages[0].content}</button>
                        </div>
                    )
                })
                }
            </div>
            {
                sketchbook &&
                <Modal
                    open={openedModal}
                    closeModal={()=>{
                        setOpenedModal(false); setSketchbook();
                    }}
                >
                    <SketchbookDisplay 
                        sketchbook={sketchbook}
                    />
                </Modal>
            }
        </div>
    )
}



export default GameOver;