import React from 'react';
import loader from 'images/loader.gif'

const styles={
    loadingWrapper:{
        display:'flex',
        alignItems:'center',
        height:'calc(100vh - 120px)'
    },
    loadingImage:{
        maxWidth:"100%",
        width:400,
        margin:"0 auto"
    }
}
export default function Loading(){
    return(
        <div style={styles.loadingWrapper}>
            <img src={loader} alt='loader' style={styles.loadingImage}/>
        </div>
    )
};