import React,{Fragment} from 'react';
// Components
import DefButton from '../Micro/defaultButton';
import NivelApoyo from '../Micro/nivel_apoyo';

const DetailInitiative = ({initiative/*,initiatives*/})=>{
    if(/*initiatives && */initiative){
        console.log(initiative);
        const init = initiative;//initiatives.filter(el => el.id === initiative)[0];
        return (<Fragment >
            <img className='card_initiative_img' alt={`img_holder_${init.id}`} src='https://phassociation.org/wp-content/uploads/2017/04/iStock_000079377379_Medium.jpg'/>
            <p className='card_title'>{init.nombre}</p>
            <p className='card_desc'>{init.descripcion}</p>
            <p className='sector'>Sector: {init.sector.nombre}</p>
            <p className='desc'>Ubicacion: <span >{`${init.ciudad.departamento.nombre} - ${init.ciudad.nombre}`}</span></p>
            <p className='desc'>Fase: <span >{init.fase.nombre}</span></p>
            <p className='desc'>Nivel de apoyo actual: <span >{init.nivel_apoyo.nombre}</span> <NivelApoyo id={init.nivel_apoyo.id} classes={'medium'}/></p>
            <DefButton title={`Escribir a Whatsapp`} classes={`wide`} action={()=>console.log('Contact WhatsApp')}/>
        </Fragment>);
    }
    return <p>Loading ...</p>;

}

export default DetailInitiative;