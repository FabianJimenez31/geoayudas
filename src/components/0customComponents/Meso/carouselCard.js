import React,{Fragment} from 'react';
// Components Ant 
import { Col } from 'antd';
// Components
import DefButton from '../Micro/defaultButton';
// Function 
import {ToStrong} from '../commonFunctions';

// This component will display mainly Text
const CarouselCard = ({content}) => {
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
                <DefButton title={content.buttonlabel} classes={`carousel`} icon={content.buttonicon}/>
            </Col>
    </Fragment>;
}

export default CarouselCard;
