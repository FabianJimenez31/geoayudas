import React from 'react';


const SocialMedia = ({classes, name, link}) =>{
    return <div className={classes}>
        <a href={link}>
         <img src={`/assets/icons/${name}.svg`} className={classes} alt='sm'/>
        </a>
    </div>

}

export default SocialMedia;