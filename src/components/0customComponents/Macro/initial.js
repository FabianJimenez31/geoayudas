import React from 'react';
// Ant Components 
import { Row, Col, Carousel } from 'antd';
// Components 
import CarouselCard from '../Meso/carouselCard';
import ControllerCarousel from '../Meso/carouselController';
import Form1 from '../Meso/form1';
// Function
import {IndexWrap/*, ServerData*/} from '../commonFunctions';
// Info Imported
const slides = require('../sharedContents/carousel-contents.json');

class Initial extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state={
            carouselID:0,
            departamentos:null,
            departamento:null,
            cities:null,
            city:null,
        }
    }
    // State Functions
    // async CheckDepartamentos(){
    //     let data = await ServerData(`/departamentos`);
    //     if(data){
    //         this.setState(()=>({departamentos:data, cities:null}));
    //     }
    // }

    // async CheckCities(id_departamento){
    //     const data = await ServerData(`/ciudades/${id_departamento}`);
    //     if(data){
    //         this.setState(()=>({cities:data}));
    //     }
    // }

    // componentDidMount(){
    //     this.CheckDepartamentos();
    // }

    // componentDidUpdate(){
    //     let {departamento, cities} = this.state;
    //     // Check on State Changes 
    //     if(departamento && !cities){
    //        this.CheckCities(departamento);
    //    }
    // }
    SetCarouselID = (params) =>{
        this.setState({carouselID:params})
    }
    SetDepartamento = (params) =>{
        this.setState(()=>({departamento:params, cities:null}));
        this.props.setDepartamento(params);
    }
    SetCity = (params) =>{
        this.setState(()=>({city:params}));
        this.props.setCity(params);
    }
    

    render(){
    // Variables and References
    const carouselRef = React.createRef();
    const carouselRefBack = React.createRef();
    const {
            carouselID,
            // departamentos,
            // cities
            } = this.state;
    const {
        waitTime,
        }= this.props;
    const {
            SetCarouselID,
            SetDepartamento,
            SetCity
            } = this;

    let departamentos = null;
    let cities=null;
    if(this.props.organizedInitiatives){
        //departamentos =[];
        departamentos= Object.entries(this.props.organizedInitiatives).map((el,i)=>{
           return {nombre:el[0],id:el[1].id}
        }) ;
    }
    if(this.state.departamento && this.props.organizedInitiatives){
        // console.log('estado: ',this.state.departamento);
        // console.log('entry: ', Object.entries(this.props.organizedInitiatives));
        cities = Object.entries(this.props.organizedInitiatives).filter((el)=>el[1].id === this.state.departamento);
        cities = Object.entries(cities[0][1].ciudades).map((el,i)=>{
            return {
                nombre:el[0],
                id: el[1].id
            }
        }); 
    }

    // 
    const CarouselSlideUpdate = (el)=>{
        SetCarouselID(el);
    }
    const CarouselBackUpdate=(el)=>{
        carouselRefBack.current.slick.slickNext();
    }

    // Carousel Functions
    const CarouselSlideUp = () =>{
        // Carousel 1
        SetCarouselID(IndexWrap(slides,(carouselID-1)));
        carouselRef.current.slick.slickPause();
        setTimeout(carouselRef.current.slick.slickPlay(),waitTime);
        carouselRef.current.slick.slickPrev();
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(carouselRefBack.current.slick.slickPlay(),waitTime);
        carouselRefBack.current.slick.slickPrev();
    }

    const CarouselSlideDown = () =>{
        SetCarouselID(IndexWrap(slides,(carouselID+1)));
        carouselRef.current.slick.slickPause();
        setTimeout(carouselRef.current.slick.slickPlay(),waitTime);
        carouselRef.current.slick.slickNext();
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(carouselRefBack.current.slick.slickPlay(),waitTime);
        carouselRefBack.current.slick.slickNext();
        
    }

    const SelectedSlide = (slideNumber) =>{
        SetCarouselID(slideNumber);
        carouselRef.current.slick.slickPause();
        setTimeout(carouselRef.current.slick.slickPlay(),waitTime);
        carouselRef.current.slick.slickGoTo(slideNumber);
        // Carousel 2
        carouselRefBack.current.slick.slickPause();
        setTimeout(carouselRefBack.current.slick.slickPlay(),waitTime);
        carouselRefBack.current.slick.slickGoTo(slideNumber);
    }


        return(
        <div id='initial'>
            <div className={`background-carousel`}>
                <Carousel ref={carouselRefBack}>
                    {slides.map((el,i)=> <img src={el.image}  alt={el.imagealt} key={`carousel_image_${i}`} className={`background-images`}/>)}
                </Carousel>
            </div>
            <Row className='home' align="middle" >
                <Col  offset={2} xs={20} lg={12} flex={1} >
                <Carousel className='home-carousel'  afterChange={CarouselSlideUpdate} speed={1000} ref={carouselRef} beforeChange={CarouselBackUpdate} 
                autoplay
                >
                    {slides.map((el,i )=> <CarouselCard content={el} key={`carouselSlide_${i}`}/>)}
                </Carousel>
                <ControllerCarousel currentSlide={slides[carouselID].id} up={CarouselSlideUp} down={CarouselSlideDown} actionTabs={SelectedSlide} slides={slides}/>
                </Col>
                <Col  offset={2} xs={20} lg={6} >
                   <Form1 departamentos={departamentos} ciudades={cities} setDepartamento={SetDepartamento} setCity={SetCity} />
                </Col>
            </Row>
        </div>);
    }
}



export default Initial;