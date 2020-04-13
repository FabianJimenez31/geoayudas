import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Select, Carousel,Layout,Tabs,Modal } from 'antd';
//Icons 
import {LeftOutlined, RightOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;
const {Header, Footer,Content} = Layout;
const slides = require('./carousel-contents.json');

const { Option } = Select;

const ToStrong = (text) =>{
    return text.split('%STRONG%').map((el,i)=>{
        if(i % 2 !== 0){
            return <span style={{color:'white'}} key={`text_${i}`}>{el}</span >
        }else{ return <span key={`text_${i}`}>{el}</span>}
    });
}

function HomeButton ({title, classes, icon, action}){
return <Button onClick={action} className={`custom1 ${classes}`}>{icon && <img src={icon} className={'button-icon'} alt='icon_logo' />}{title}</Button>;
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

function Form1 ({departamentos, ciudades, setDepartamento}){
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
                                className={`form1`}
                                onChange={(el)=>{setDepartamento(el)}}>
                                {
                                    departamentos && departamentos.map((el,i)=><Option key={`departamentos_${i}`} value={el.id}>{el.nombre}</Option>)
                                }
                                </Select>

                            </Form.Item>
                            <Form.Item label='ESCOGE LA CIUDAD EN LA CUAL DESEAS DONAR' className={`form-q`}>
                                <Select className={`form1`} >
                                {
                                    ciudades ? ciudades.map((el,i)=><Option key={`ciudades_${i}`} value={el.id}>{el.nombre}</Option>):''
                                }
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




function ServerAndSet(path,setState){
    fetch(`/api${path}`)
    .then(response=> {
        if(response.status === 200){
            return response.json();
        }else{
            throw new Error('bad request');
        }
    })
    .then(response => {
        setState(response);
    })
    .catch(err => console.log(err));
}

const SlidesToShow = (numberofslides) =>{
    const width = document.body.clientWidth;
    const slides = numberofslides ? numberofslides.length : 1;
    if(width > 1800){
        if(slides >= 4){
            return 4;
        }else{
            return slides;
        }
    }else if(width> 1200 && width< 1800 ){
        if(slides >= 3){
            return 3;
        }else{
            return slides;
        }
    }
    else if(width> 800 && width< 1200 ){
        if(slides >= 2){
            return 2;
        }else{
            return slides;
        }
    }else{
        return 1;
    }
}


export const Home = () => {

    // Data from Server
    const [departamentos, setDepartamentos] = useState(null);
    const [departamento, setDepartamento]= useState(null);
    const [ciudades, setCiudades] = useState(null);
    const [allCities, setallCities] = useState(null);
    const [currentcity, setCurrentCity] = useState(null);
    const [initiatives, setInitiatives] = useState(null);
    const [initiative,setInitiative] = useState(null);
    
    
    const setDepartamentofunc=(el) =>{
        setDepartamento(el);
        setCiudades(null);
    }

    const ChangeCurrentCity = (el) =>{
        setCurrentCity(el);
        ServerAndSet(`/iniciativas/${el}`,setInitiatives);
    }

    if(departamento && !ciudades){
        ServerAndSet(`/ciudades/${departamento}`,setCiudades);
    }
    if(allCities && !currentcity){
        setCurrentCity(allCities[0].id);
    }
    if(currentcity && !initiatives){
        ServerAndSet(`/iniciativas/${currentcity}`,setInitiatives);
            
    }



    useEffect(()=>{
        // Get departments to form 1 
        ServerAndSet(`/departamentos`,setDepartamentos);
        // Get all cities for Mockup-4 page
        ServerAndSet(`/ciudades`,setallCities);
        ResizeBackGroundImages();
        
        window.addEventListener('resize',function(){ResizeBackGroundImages();});
        window.addEventListener('orientationchange',function(){ResizeBackGroundImages();});
    },[]);

    // Carousel Wide Mock4
    const carouselWide=useRef();
    const [carouselMk4, setCarouselMk4] = useState(0);
    const CMk4Up = () => {
        setCarouselMk4(IndexWrap(initiatives,(carouselMk4-1)));
        carouselWide.current.slick.slickPause();
        setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
        carouselWide.current.slick.slickPrev();
    }
    const CMk4Down = () => {
        setCarouselMk4(IndexWrap(initiatives,(carouselMk4+1)));
        carouselWide.current.slick.slickPause();
        setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
        carouselWide.current.slick.slickNext();
    }
    const CMk4Goto = (item) => {
        setCarouselMk4(item);
        carouselWide.current.slick.slickPause();
        setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
        carouselWide.current.slick.slickGoTo(item);
    }


    // Carousel 

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

    const ZoomInitiative = ()=>{
        if(initiatives && initiative){
            const init = initiatives.filter(el => el.id === initiative)[0];
            return (<Fragment >
                <img className='card_initiative_img' alt={`img_holder_${init.id}`} src='https://phassociation.org/wp-content/uploads/2017/04/iStock_000079377379_Medium.jpg'/>
                <p className='card_title'>{init.direccion}</p>
                <p className='card_desc'>{init.url}</p>
                <p className='sector'>Sector: {init.sector.nombre}</p>
                <p className='desc'>Ubicacion: <span >{`${init.ciudad.departamento.nombre} - ${init.ciudad.nombre}`}</span></p>
                <p className='desc'>Fase: <span >{init.fase.nombre}</span></p>
                <p className='desc'>Nivel de apoyo actual: <span >{init.nivel_apoyo.nombre}</span></p>
                <HomeButton title={`Escribir a Whatsapp`} classes={`wide`} action={()=>console.log('Contact WhatsApp')}/>
            </Fragment>);
        }
        return <p>Loading ...</p>;

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
                <Carousel className='home-carousel'  afterChange={CarouselSlideUpdate} speed={1000} ref={carouselRef} beforeChange={CarouselBackUpdate} autoplay>
                    {slides.map((el,i )=> <CarouselCard content={el} key={`carouselSlide_${i}`}/>)}
                </Carousel>
                <ControllerCarousel currentSlide={slides[carouselID].id} up={CarouselSlideUp} down={CarouselSlideDown} actionTabs={SelectedSlide} slides={slides}/>
                </Col>
                <Col  offset={2} xs={20} lg={6} >
                   <Form1 departamentos={departamentos} ciudades={ciudades} setDepartamento={setDepartamentofunc}/>
                </Col>
            </Row>
            {/* Mockup Slide 4 */}
            <Layout className='mock-4'>
                <Header>
                    <h2 className="title_on_white">INICIATIVAS Y <br/>EMPRENDIMIENTOS</h2>
                </Header>
                <Content>
                    <Modal
                        visible={initiative?true:false}
                        onCancel={()=>{setInitiative(null)}}
                        footer={null}
                        className="init_modal"
                        >
                            {
                              ZoomInitiative()
                            }
                    </Modal>
                    <Row>
                        <Col >
                        <Tabs defaultActiveKey={allCities ? allCities[0].id :'last'} className="custom-tab" onChange={(el)=>{ChangeCurrentCity(el)}}>
                            {allCities && allCities.map((el,i)=>{
                                return (<TabPane tab={el.nombre} key={el.id} className="custom-tabpane">
                                {
                                    parseInt(currentcity)  === el.id ? 
                                    <div id='CarouselWide'>
                                            <Carousel className='carousel_view_extended' ref={carouselWide} autoplay slidesToShow={initiatives? SlidesToShow(initiatives):1}
                                            afterChange={setCarouselMk4} >
                                        {initiatives && initiatives.map((el,i)=>{
                                            return (<Card key={`card_carousel_${i}`} className='init_card'>
                                                <img className='card_initiative_img' alt={`img_holder_${i}`} src='https://phassociation.org/wp-content/uploads/2017/04/iStock_000079377379_Medium.jpg'/>
                                                <p className='card_title'>{el.direccion}</p>
                                                <p className='card_desc'>{el.url}</p>
                                                <HomeButton title={`Contactar`} classes={`wide`} action={()=>setInitiative(el.id)}/>
                                            </Card>);
                                        })}
                                    </Carousel>
                                    </div>
                                     :
                                    'Loading ...'
                                }
                            </TabPane>);
                            })} 
                            {
                                allCities && <TabPane tab='otros' key='last'>
                                Otros ....
                            </TabPane>
                            }
                         </Tabs>
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    {/* ControllerCarousel ({currentSlide, up , down, actionTabs, slides}) */}
                    {initiatives  ?
                    // <ControllerCarousel currentSlide={carouselMk4} up={CMk4Up} down={CMk4Down} actionTabs={CMk4Goto} slides={initiatives}/>
                    <div className='carousel-controller bk-white'>
                    <Button shape='circle' icon={<LeftOutlined />} onClick={CMk4Up}/>
                    <Button shape='circle' icon={<RightOutlined />} onClick={CMk4Down}/>
                    <span>{carouselMk4+1 > 9 ? carouselMk4+1 :`0${carouselMk4+1}`}</span>
                    <ul className={`cus-controlller`}>
                        {initiatives.map((el,i) => <li key={`carouselSlide_${i}`}><button className={carouselMk4 === i ? 'selected':''} onClick={()=>{CMk4Goto(i)}}></button></li>)}
                    </ul>
                    <span>{initiatives.length > 9 ? initiatives.length :`0${initiatives.length}`}</span>
                    <div className='line'></div>
                    </div>
                    :
                    ''
                    }
                </Footer>
            </Layout>
        </Fragment>
    );
}