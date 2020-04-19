import React from 'react';
// Ant Components
import { Carousel } from 'antd';
//Components
import StaffMember from '../Meso/staffMember';


const staffMember = require('../sharedContents/staff.json');

class Staff extends React.Component{
    constructor(){
        super();
        this.state={
            carouselID: 0
        }
       
    }
 

    //Carousel Functions
    CarouselUp = (refe,waitTime) => {
        refe.current.slick.slickPause();
        setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
        refe.current.slick.slickPrev();
    }
    CarouselDown = (refe,waitTime) => { 
        refe.current.slick.slickPause();
        setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
        refe.current.slick.slickNext();
    }
    
    render(){
        const staff_car= React.createRef();
        const waitTime= 2000;

        return<div id='staff' className={`staff`}>
            <p className="staff_title">NUESTRO EQUIPO</p>
            <Carousel 
            ref={staff_car}
            dots={false}
            autoplay
            >
            {
            staffMember.map((el,i)=>{
                return <StaffMember member={el} key={`staff_carousel_${i}`} numberSlides={staffMember.length} currentSlide={this.state.carouselID} up={()=>this.CarouselUp(staff_car,waitTime)} down={()=>this.CarouselDown(staff_car,waitTime)}/>
            })
            }
            </Carousel>
            
        </div>;
    }
}



export default Staff;