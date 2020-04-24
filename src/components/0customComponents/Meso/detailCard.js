import React,{Fragment} from 'react';
// Components
import DefButton from '../Micro/defaultButton';
import NivelApoyo from '../Micro/nivel_apoyo';


// Choose Def Button if write an email or go to url
const ChooseDefButton=(url_link)=>{
    const isEmail = url_link.includes('@');
    if(url_link && isEmail){
        // console.log(url_link);
        return <a href={`mailto:${url_link}`}>
            <DefButton title={`Escribir Email`} classes={`wide`} />
            </a>;
    }else if (url_link && !isEmail){
        return <a href={`${url_link}`}>
        <DefButton title={`Ir a la pagina web`} classes={`wide`} />
        </a>;
    }else{
        return <div></div>;
    }
}



const DetailInitiative = ({initiative/*,initiatives*/})=>{
    if(/*initiatives && */initiative){
        const init = initiative;//initiatives.filter(el => el.id === initiative)[0];
        return (<Fragment >
            <img className='modal card_initiative_img' alt={`img_holder_${init.id}`} 
            src={init.link_image?init.link_image:`/assets/jpg/Thumbnail_${Math.floor(Math.random() * (6 - 1 + 1) + 1)}.png`}/>
            <p className='modal card_title'>{init.nombre}</p>
            <div className='modal card_desc'>{init.descripcion}</div>
            <p className='modal card_desc'>{init.url}</p>
            <p className='modal sector'>Sector: {init.sector.nombre}</p>
            <p className='modal desc'>Ubicacion: <span >{`${init.ciudad.departamento.nombre} - ${init.ciudad.nombre}`}</span></p>
            <p className='modal desc'>Fase: <span >{init.fase.nombre}</span></p>
            <p className='modal desc'>Nivel de apoyo actual: <span >{init.nivel_apoyo.nombre}</span> <NivelApoyo id={init.nivel_apoyo.id} classes={'medium'}/></p>
            {
                ChooseDefButton(init.url)
            }
        </Fragment>);
    }
    return <p>Loading ...</p>;

}

export default DetailInitiative;