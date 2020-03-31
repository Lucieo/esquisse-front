import React, {useState, useEffect} from 'react';
import applyCountdown from 'components/Counter/applyCountdown';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SUBMIT_PAGE = gql`
mutation SubmitPage($sketchbookId: ID!, $gameId: ID!, $content: String!, $pageType: String!){
    submitPage(sketchbookId: $sketchbookId, gameId: $gameId, content: $content, pageType: $pageType){
        id
    }
}
`;

const InitMode = ({finished, gameId, sketchbookId})=>{
    const pageType = 'init';
    const [content, setContent] = useState('');
    const [submitPage, {loading, error}]= useMutation(SUBMIT_PAGE, {
        variables :{
            content,
            pageType,
            gameId,
            sketchbookId
        },
        onCompleted:()=>{
            console.log('PAGE SUBMITTED FOR SKETCHBOOK', sketchbookId, "with content ", content)
        }
    });

    useEffect(() => {
        if(finished){
            submitPage()
        }
    }, [finished]);

    return(
        <>
            {
                !finished
                ?<p>Indiquez un mot pour commencer la partie</p>
                : <p>Votre mot a été enregistré</p>
            }
            <input
            placeholder="Mot Initial"
            type="text"
            value={content}
            onChange={e=>setContent(e.target.value)}
            disabled={finished}
            />
        </>
    )
}

export default applyCountdown(InitMode)