import React from 'react';
import Lapin from 'images/lapin.png'

const styles={
    illustration:{
        width:"100%",
        maxWidth:300,
        marginTop:30
    },
    marginNull:{
        margin:0
    },
    pageWrapper:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "calc(100vh - 90px)"
    }
}

export default function OnGoingGame(){
    return(
        <div class="center" style={styles.pageWrapper}>
            <h3>Vous êtes en retard!</h3>
            <p>Cette partie a déjà commencé vous ne pouvez plus la rejoindre.</p>
            <p style={styles.marginNull}> Attendez la fin pour découvrir les résultats.</p>
            <img style={styles.illustration} src={Lapin} alt='lapin'/>
        </div>
    )
}