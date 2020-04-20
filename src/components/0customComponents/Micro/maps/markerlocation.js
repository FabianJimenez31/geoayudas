import React from 'react';


const MarkerLocation = ({classes,action}) =>{
    return <button className='marker-round' onClick={action}>
        <div className={`out_big ${classes}`}></div>
        <div className={`out_med ${classes}`}> </div>
        <div className={`circle_mark ${classes}`}></div>
        </button>;
}

export default MarkerLocation;