import React from 'react';
// Component Ants
import { Button } from 'antd';
// Icons 
import {LeftOutlined, RightOutlined} from '@ant-design/icons';


const  ControllerCarousel = ({currentSlide, up , down, actionTabs, slides})=> {
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


export default ControllerCarousel;