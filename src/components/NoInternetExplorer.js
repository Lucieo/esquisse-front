import React from 'react';
import Bg from 'images/crayons.jpeg'

const styles={
    background:{
        background: `url(${Bg})`,
        height: "100vh",
        backgroundSize: "cover",
        position: "fixed",
        textAlign:"center",
        padding:10,
        width:"100%"
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
            <div className="container">
                <h1 style={styles.title}>Oh noooooon internet explorer....</h1>
                <p>Cette version de esquisse en ligne est optimisée pour fonctionner sur chrome ou firefox! </p>
                <p>Change de navigateur ça ira mieux!</p>
            </div>
        </div>
    )
}