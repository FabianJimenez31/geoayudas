import React,{Fragment} from 'react';
// Components Ant
import { Col, Card, Form, Select } from 'antd';
// Component 
import DefButton from '../Micro/defaultButton';
const { Option } = Select;
// Routes
const routes = require('../sharedContents/id_routes.json');

const  Form1 = ({departamentos, ciudades, setDepartamento, setCity})=>{

    const [defcity, setDefcity]= React.useState(null);

    return <Fragment>
                    <Card className={`form`}>
                    <h2>ENCUENTRA A UNA BUENA CAUSA PARA DONAR</h2>
                    <Col span={24}>
                        <Form
                            layout='vertical'
                        >
                            <Form.Item label='DEPARTAMENTO' className={`form-q`}>
                                <Select 
                                className={`form1`}
                                onChange={(el)=>{
                                    //console.log(el);
                                    setDepartamento(el);
                                    setDefcity(null);
                                }
                                   
                                    }>
                                {
                                    departamentos && departamentos.map((el,i)=><Option key={`departamentos_${i}`} value={el.id}>{el.nombre}</Option>)
                                }
                                </Select>

                            </Form.Item>
                            <Form.Item label='ESCOGE LA CIUDAD EN LA CUAL DESEAS DONAR' className={`form-q`}>
                                <Select 
                                className={`form1`}
                                onChange={(el)=>{
                                    setDefcity(el);
                                    setCity(el);}}
                                disabled={ciudades ? false:true}
                                value={defcity}
                                >
                                
                                {
                                    ciudades && ciudades.map((el,i)=><Option key={`ciudades_${i}`} value={el.id}>{el.nombre}</Option>)
                                }
                                </Select>
                            </Form.Item>
                            <Form.Item >
                            <a href={`/#${routes[3].name}`}>
                            <DefButton title={`donar`} classes={`wide`} />
                            </a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Card>
                    <p className="help">¿Necesitas Ayuda? <a className='purple' href="/#">Clic Aquí</a> </p>
            </Fragment>
}

export default Form1;