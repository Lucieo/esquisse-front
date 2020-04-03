import React, { useEffect } from 'react';

export default function EndOfGame({endGame}){
    useEffect(() => {
        endGame()
      }, []);
    return(
        <div className="center">THIS IS THE END</div>
    )
}