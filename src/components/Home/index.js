import React, { Fragment } from 'react';
import { Row, Col, Card, Button, Form, Select } from 'antd';
import './master.css';

const { Option } = Select;

export const Home = () => {
    return (
        <Fragment>

            <Row className='home' style={{padding:'40px 0px'}}>
                <Col offset={2} span={16}  style={{paddingTop:'100px'}}>
                    <Col style={{fontSize:'10px'}} span={24}>
                        <span>POBLACIÓN VULNERABLE</span>
                    </Col>
                    <Col span={24}>
                        <h1 className='home-title'>AYUDA A LOS MAS NECESITADOS</h1>
                    </Col>
                    <Col span={24}>
                        <p>Con tu ayuda garantirizaremos llegar a muchas  <span>Familias Colombianas</span>
                            para enfrentar la crisis sanitaria del <span>COVID-19</span>
                        </p>
                    </Col>
                    <Col span={24}>
                        <Button type='primary' > APOYAR </Button>
                    </Col>

                </Col>
                <Col span={5} >
                    <Card>
                        <h2>ENCUENTRA A UNA BUENA CAUSA PARA DONAR</h2>
                        <Col span={24}>
                            <Form
                                layout='vertical'
                            >
                                <Form.Item label='DEPARTAMENTO'>

                                    <Select 
                                    style={{width:'100%'}}>
                                        <Option></Option>
                                    </Select>

                                </Form.Item>
                                <Form.Item label='ESCOGE LA CAUSA A LA CUAL DESEAS DONAR'>
                                    <Select >
                                        <Option></Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item >
                                    <Button style={{width:'100%'}} type='primary' size='large'>DONAR</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Card>
                </Col>
            </Row>

        </Fragment>
    );
}