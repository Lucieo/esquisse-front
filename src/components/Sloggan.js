import React from 'react';

const styles ={
    red:{color:"#F1012C"},
    orange:{color: "#EE6402"},
    yellow:{color:"#F8AF28"},
    green:{color: "#69961F"},
    blue:{color: "#62A6C4"}
}

export default function Sloggan(){
    return(
        <>
            <span style={styles.red}>H</span>
            <span style={styles.orange}>e</span>
            <span style={styles.yellow}>y</span>
            &nbsp;
            <span style={styles.green}>O</span>
            <span style={styles.blue}>h</span>
            &nbsp;
            <span style={styles.red}>L</span>
            <span style={styles.orange}>e</span>
            <span style={styles.yellow}>t</span>
            <span style={styles.green}>'s</span>
            &nbsp;
            <span style={styles.blue}>D</span>
            <span style={styles.red}>r</span>
            <span style={styles.orange}>a</span>
            <span style={styles.yellow}>w</span>
            <span style={styles.green}>!</span>
        </>
    )
}