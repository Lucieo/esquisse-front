import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL_SKETCHBOOKS} from 'graphQL/queries';
import Loading from 'components/Loading';
import SketchbookDisplay from 'components/SketchbookDisplay';
import './PdfFormat.css'

export default function PdfFormat(){
    const {gameId} = useParams();
    const {data, loading, error} = useQuery(GET_ALL_SKETCHBOOKS, {
        variables:{gameId}
    })

    if(loading) return <Loading/>
    return(
        <div className="pdf-format center container">
            <h4>Une si belle partie!</h4>
            <h5>avec la participation de  {data && data.getAllSketchbooks.map((sketchbook, index)=><span key={index}> {sketchbook.pages[0].creator.name} </span>)}</h5>
            <p>cliquez sur options/imprimer/version-pdf dans votre navigateur pour garder un souvenir</p>
            {
                data && data.getAllSketchbooks.map(
                    (sketchbook, index)=>{
                        return(
                            <div key={index} className="pdf-format__sketchbook">
                                <h4>carnet n°{index+1}</h4>
                                <SketchbookDisplay sketchbook={sketchbook}/>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}