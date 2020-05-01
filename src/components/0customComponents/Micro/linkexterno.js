import React from 'react';
import { OmitProps } from 'antd/lib/transfer/renderListBody';


const LinkExterno = (props) =>{
    return<div className='external_form'>
        <a href={props.link}>
      {props.children}
        </a>
        <img src='assets/icons/click.svg'/>
    </div>;
}


export default LinkExterno;