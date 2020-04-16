import React from 'react';
// Ant Components
import {Button} from 'antd';

const DefButton = ({title, classes, icon, action})=>{
    return <Button onClick={action} className={`custom1 ${classes}`}>{icon && <img src={icon} className={'button-icon'} alt='icon_logo' />}{title}</Button>;
    }
    
export default DefButton;