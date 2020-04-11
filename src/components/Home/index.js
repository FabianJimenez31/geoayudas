import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Select, Carousel } from 'antd';
//Icons 
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const slides = require('./carousel-contents.json');

const { Option } = Select;

const ToStrong = (text) =>{
    return text.split('%STRONG%').map((el,i)=>{
        if(i % 2 !== 0){
            return <span style={{color:'white'}} key={`text_${i}`}>{el}</span >
        }else{ return <span key={`text_${i}`}>{el}</span>}
    });
}

function HomeButton ({title, classes, icon}){
return <Button className={`custom1 ${classes}`}>{icon && <img src={icon} className={'button-icon'} alt='icon_logo'/>}{title}</Button>;
}

function CarouselCard ({content}){
    return <Fragment>
         <Col className={`carousel-text1`} span={24}>
                <span>{content.text1}</span>
            </Col>
            <Col className={`carousel-text2`} span={24}>
                <h1 className='home-title'>{content.text2}</h1>
            </Col>
            <Col className={`carousel-text3`} span={24}>
                <p>
                    {ToStrong(content.text3)}
                </p>
            </Col>
            <Col span={24}>
                <HomeButton title={content.buttonlabel} classes={`carousel`} icon={content.buttonicon}/>
            </Col>
    </Fragment>;
}

function ControllerCarousel ({currentSlide, up , down, actionTabs, slides}){
    return <div className='carousel-controller'>
        <Button shape='circle' icon={<LeftOutlined />} onClick={up}/>
        <Button shape='circle' icon={<RightOutlined />} onClick={down}/>
        <span>{slides[slides.findIndex(el => el.id === currentSlide)].id}</span>
        <ul className={`cus-controlller`}>
            {slides.map((el,i) => <li key={`carouselSlide_${i}`}><button className={currentSlide === el.id ? 'selected':''} onClick={()=>{actionTabs(i)}}></button></li>)}
        </ul>
        <span>{slides[slides.length-1].id}</span>
    </div>
}

function Form1 (){
    return <Fragment>
                    <Card className={`form`}>
                    <h2>ENCUENTRA A UNA BUENA CAUSA PARA DONAR</h2>
                    <Col span={24}>
                        <Form
                            layout='vertical'
                        >
                            <Form.Item label='DEPARTAMENTO' className={`form-q`}>

                                <Select 
                                style={{width:'100%'}}
                                className={`form1`}>
                                
                                    <Option></Option>
                                </Select>

                            </Form.Item>
                            <Form.Item label='ESCOGE LA CAUSA A LA CUAL DESEAS DONAR' className={`form-q`}>
                                <Select className={`form1`} >
                                    <Option></Option>
                                </Select>
                            </Form.Item>
                            <Form.Item >
                            <HomeButton title={`donar`} classes={`wide`}/>
                            </Form.Item>
                        </Form>
                    </Col>
                </Card>
                    <p className="help"> ¿ Necesitas Ayuda ? <a className='purple' href="#">Click Aqui</a> </p>
            </Fragment>
}

const IndexWrap = (arr, i) =>{
    if(i> arr.length-1){
        return 0;
    }else if(i < 0){
        return arr.length-1;
    }else {
        return i}
}

const ResizeBackGroundImages = () =>{
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    const sliderHeight = document.getElementsByClassName('home')[0].clientHeight;
    const backImages = document.getElementsByClassName('background-images');
    for(let el of backImages){
        el.style.height = `${headerHeight+sliderHeight+50}px`;
    }
}

export const Home = () => {

    useEffect(()=>{
        ResizeBackGroundImages();
        window.addEventListener('resize',ResizeBackGroundImages);
        window.addEventListener('orientationchange',ResizeBackGroundImages);
    });

    const [carouselID,SetCarouselID] = useState(0);

    const carouselRef = useRef();
    const carouselRefBack = useRef();

    const waitTime = 2000;

    const CarouselSlideUpdate = (el)=>{
        SetCarouselID(el);
    }
    const CarouselBackUpdate=(el)=>{
        carouselRefBack.current.slick.slickNext();
    }

    const CarouselSlideUp = () =>{
        // Carousel 1
        SetCarouselID(IndexWrap(slides,(carouselID-1)));
        carouselRef.current.slick.slickPause();
        setTimeout(()=>{carouselRef.current.slick.slickPlay();},waitTime);
        carouselRef.current.slick.slickPrev();
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(()=>{carouselRefBack.current.slick.slickPlay();},waitTime);
        carouselRefBack.current.slick.slickPrev();
    }

    const CarouselSlideDown = () =>{
        SetCarouselID(IndexWrap(slides,(carouselID+1)));
        carouselRef.current.slick.slickPause();
        setTimeout(()=>{carouselRef.current.slick.slickPlay();},waitTime);
        carouselRef.current.slick.slickNext();
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(()=>{carouselRefBack.current.slick.slickPlay();},waitTime);
        carouselRefBack.current.slick.slickNext();
        
    }

    const SelectedSlide = (slideNumber) =>{
        SetCarouselID(slideNumber);
        carouselRef.current.slick.slickPause();
        setTimeout(()=>{carouselRef.current.slick.slickPlay();},waitTime);
        carouselRef.current.slick.slickGoTo(slideNumber);
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(()=>{carouselRefBack.current.slick.slickPlay();},waitTime);
        carouselRefBack.current.slick.slickGoTo(slideNumber);
    }

    

    return (
        <Fragment>
            <div className={`background-carousel`}>
                <Carousel ref={carouselRefBack}>
                    {slides.map((el,i)=> <img src={el.image}  alt={el.imagealt} key={`carousel_image_${i}`} className={`background-images`}/>)}
                </Carousel>
            </div>
            <Row className='home' align="middle" >
                <Col  offset={2} xs={20} lg={12} flex={1} >
                <Carousel className='home-carousel'  afterChange={CarouselSlideUpdate} speed={1000} ref={carouselRef} beforeChange={CarouselBackUpdate}>
                    {slides.map((el,i )=> <CarouselCard content={el} key={`carouselSlide_${i}`}/>)}
                </Carousel>
                <ControllerCarousel currentSlide={slides[carouselID].id} up={CarouselSlideUp} down={CarouselSlideDown} actionTabs={SelectedSlide} slides={slides}/>
                </Col>
                <Col  offset={2} xs={20} lg={6} >
                   <Form1 />
                </Col>
            </Row>
        </Fragment>
    );
}