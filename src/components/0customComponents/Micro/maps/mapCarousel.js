import React from 'react';
// Ant Components
import { Carousel,Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


function CarouselCard({element}){
    return (<div className='map_car_holder'>
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
            <span>Sector:</span>   {element.sector.nombre}
            </p>
            <p className='ubicacion'>
            <span>Ubicacion:</span> {element.ciudad.departamento.nombre}-{element.ciudad.nombre}
            </p>
            <p className='fase'>
               <span>Fase:</span> {element.fase.nombre}
            </p>
            <div className='apoyo'>
               <span>Nivel de apoyo:</span> {element.nivel_apoyo.nombre} <div className='emoticon'></div>
            </div>
    </div>);
}

const MapCarousel = ({elements}) =>{

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
    <Carousel autoplay ref={carouselRef} dots={false} slidesToShow={4}>
    {elements && elements.map((el,i)=>{
        return(
            <CarouselCard element={el} key={`carousel_map_${i}`}/>
        );
    })}
    </Carousel>
</div>);
};


export default MapCarousel;