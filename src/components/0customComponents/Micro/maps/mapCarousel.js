import React from 'react';
// Ant Components
import { Carousel,Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// Components 
import NivelApoyo from '../nivel_apoyo';



const SliceName = (nombre)=>{
    if(nombre != null && nombre.length > 25 ){
    return  nombre.slice(0,25)+' ...';
    }else{
    return  nombre;
    }
}


function CarouselCard({element, setInitiative}){
    return (<div className='map_car_holder' onClick={()=>setInitiative(element)}>
        <div className='row'>
            <p className='tipo'>
                {
                element.tipo.nombre
                }
            </p>
            <div className={`tipo_circle ${element.tipo.id === 2 ? 'op1':'op2'}`}></div>
            </div>
            <p className='title'>
                {SliceName(element.nombre)}
            </p>
            <p className='sector'>
            <span>Sector:</span>   {element.sector.nombre}
            </p>
            <p className='ubicacion'>
            <span>Ubicacion:</span> {element.ciudad.departamento.nombre}-{element.ciudad.nombre}
            </p>
            <p className='fase'>
               <span>Fase:</span> {element.fase.nombre}
            </p>
            <div className='apoyo'>
               <span>Nivel de apoyo:</span> {element.nivel_apoyo.nombre} <NivelApoyo classes='small' id={element.nivel_apoyo.id}/>
            </div>
    </div>);
}

const MapCarousel = ({elements, setInitiative}) =>{

const carouselRef= React.useRef();
const waitTime= 2000;

 //Carousel Functions
 const CarouselUp = (refe,waitTime) => {
    refe.current.slick.slickPause();
    setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
    refe.current.slick.slickPrev();
}
const CarouselDown = (refe,waitTime) => { 
    refe.current.slick.slickPause();
    setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
    refe.current.slick.slickNext();
}


return(<div className='map_carousel'>
    <div className='row_controller'>
        <Button className="controller" onClick={()=>{CarouselUp(carouselRef,waitTime)}}><LeftOutlined /></Button>
        <Button className="controller" onClick={()=>{CarouselDown(carouselRef,waitTime)}}><RightOutlined /></Button>
    </div>
    <Carousel autoplay ref={carouselRef} dots={false} slidesToShow={elements && elements.length < 4 ? elements.length : 4}>
    {elements && elements.map((el,i)=>{
        return(
            <CarouselCard element={el} key={`carousel_map_${i}`} setInitiative={setInitiative}/>
        );
    })}
    </Carousel>
</div>);
};


export default MapCarousel;