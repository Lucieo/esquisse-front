import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import endGif from 'images/artist.gif';
import Loading from 'components/Loading';
import Sketchbook from 'components/Sketchbook'
import './Game.css';

import gql from 'graphql-tag'

const GET_ALL_SKETCHBOOKS = gql`
    query GetAllSketchbooks($gameId: ID!){
        getAllSketchbooks(gameId:$gameId){
            pages{
                content
                pageType
                creator{
                    name
                }
            }
        }
    }
`;

const GameOver = ({gameId})=>{
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
            <img className="game-over__gif" src={endGif} alt="artist"/>
            <div>
                <ul className="collapsible">
                    {
                        sketchbooks &&
                        sketchbooks.map((sketchbook, index)=><Sketchbook 
                        sketchbook={sketchbook}
                        key={index}
                        />)
                    }
                </ul>


            </div>

        </div>
    )
}



export default GameOver;