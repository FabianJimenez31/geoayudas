import React from 'react';
// emojis



 const NivelApoyo = ({id,classes})=>{
     if(parseInt(id)  === 1){
         return <img src='/assets/icons/emoji_happy.svg' className={`nivel_apoyo ${classes}`} alt='em-h'/>; 
     }else if (parseInt(id)  === 2){
        return <img src='/assets/icons/emoji.svg' className={`nivel_apoyo ${classes}`} alt='em'/>; 
     }else{
        return <img src='/assets/icons/emoji_sad.svg' className={`nivel_apoyo ${classes}`} alt='em-s'/>; 
     }
}

export default NivelApoyo;