import React from 'react';
// Component 
import DefButton from '../defaultButton';

const PopUpCard = ({element,setInitiative}) =>{
    return(
        <div className='popup_holder'>
            <div className='row'>
            <p className='tipo'>
                {element.tipo.nombre}
            </p>
            <div className={`tipo_circle ${element.tipo.id === 2 ? 'op1':'op2'}`}></div>
            </div>
            <p className='title'>
                {element.nombre}
            </p>
            <p className='sector'>
                {element.sector.nombre}
            </p>
            <DefButton title={'CONOCER MAS'}  action={()=>setInitiative(element)}/>
        </div>
    );
}


export default PopUpCard;