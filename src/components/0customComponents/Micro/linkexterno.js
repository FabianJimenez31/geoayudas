import React from 'react';


const LinkExterno = (props) =>{
    return<div className='external_form'>
        <a href={props.link}>
      {props.children}
        </a>
        <img src='assets/icons/click.svg' alt='click'/>
    </div>;
}


export default LinkExterno;