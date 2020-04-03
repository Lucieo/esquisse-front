import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import {GET_ALL_SKETCHBOOKS} from 'graphQL/queries';
import Loading from 'components/Loading';

export default function PdfFormat(){
    const {gameId} = useParams();
    const {data, loading, error} = useQuery(GET_ALL_SKETCHBOOKS, {
        variables:{gameId}
    })
    console.log(data)
    if(loading) return <Loading/>
    return(
        <div>
            HELLO
        </div>
    )
}