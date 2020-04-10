import React, { Fragment, useState } from 'react';
import { Row, Col, Card, Button, Form, Select, Carousel } from 'antd';

const slides = require('./carousel-contents.json');

const { Option } = Select;


const ToStrong = (text) =>{
    return text.split('%STRONG%').map((el,i)=>{
        if(i % 2 !== 0){
            return <span style={{color:'white'}}>{el}</span >
        }else{ return el}
    });
}

function HomeButton ({title, classes}){
return <Button className={`custom1 ${classes}`}>{title}</Button>;
}

function CarouselCard ({content}){
    return <React.Fragment>
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
                <HomeButton title={content.buttonlabel} classes={`carousel`}/>
            </Col>
    </React.Fragment>;
}

function Form1 (){
    return  <Card className={`form`}>
                <h2>ENCUENTRA A UNA BUENA CAUSA PARA DONAR</h2>
                <Col span={24}>
                    <Form
                        layout='vertical'
                    >
                        <Form.Item label='DEPARTAMENTO' className={`form-q`}>

                            <Select 
                            style={{width:'100%'}}>
                                <Option></Option>
                            </Select>

                        </Form.Item>
                        <Form.Item label='ESCOGE LA CAUSA A LA CUAL DESEAS DONAR' className={`form-q`}>
                            <Select >
                                <Option></Option>
                            </Select>
                        </Form.Item>
                        <Form.Item >
                        <HomeButton title={`donar`}/>
                        </Form.Item>
                    </Form>
                </Col>
            </Card>;
}





export const Home = () => {
    return (
        <Fragment>
            <Row className='home' align="middle" >
                <Col  offset={2} xs={20} md={12} flex={1} >
                <Carousel className='home-carousel'>
                    {slides.map(el => <CarouselCard content={el}/>)}
                </Carousel>
                </Col>
                <Col  offset={2} xs={20} md={6} >
                   <Form1 />
                </Col>
            </Row>

        </Fragment>
    );
}