import React from 'react';
import Bg from 'images/crayons.jpeg'

const styles={
    background:{
        background: `url(${Bg})`,
        height: "100vh",
        backgroundSize: "cover",
        position: "fixed",
        textAlign:"center",
        padding:10
    },
    title:{
        paddingTop:30,
        fontSize:"2rem",
        fontWeight:"bold"
    }
}

export default function NoMobile(){
    return(
        <div style={styles.background}>
            <h1 style={styles.title}>Lache un peu ton portable!</h1>
            <p>Cette version de esquisse en ligne est optimisée pour fonctionner sur un ordinateur. Désolé ça viendra peut-être un jour...</p>
        </div>
    )
}