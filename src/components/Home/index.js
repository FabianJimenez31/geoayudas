import React, {Fragment} from 'react';
// import { Row, Col, Card, Button, Form, Select, Carousel,Layout,Tabs,Modal } from 'antd';
// Components of the website
import Initial from '../0customComponents/Macro/initial';
import Motivation from '../0customComponents/Macro/motivation';
import MapView from '../0customComponents/Macro/mapView';
import Contents from '../0customComponents/Macro/contents';
import Staff from '../0customComponents/Macro/staff';

// Functions 
import { ResizeBackGroundImages} from '../0customComponents/commonFunctions';


// Icons 
// import {LeftOutlined, RightOutlined} from '@ant-design/icons';

// const {TabPane} = Tabs;
// const {Header, Footer,Content} = Layout;
// 

// const { Option } = Select;

class  Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            departamento:null,
            city:null,
        }
    }

    // State Functions

     setDepartamento = (params) => {
        this.setState(()=>({
            ciudades: null,
            departamento:params
        }))
    }
     setCity = (params) =>{
        this.setState(()=>({city:params}))
    }
    
     componentDidMount (){
        ResizeBackGroundImages();
        
        window.addEventListener('resize',function(){ResizeBackGroundImages();});
        window.addEventListener('orientationchange',function(){ResizeBackGroundImages();});
    }

    


    render (){
        // Variables and Functions 
        const {
                departamento,
                city,
            } = this.state;
        const waitTime = 2000;
        const {
                setCity,
                setDepartamento
                }= this;
        
       

        return (
            <Fragment>
                <Initial 
                    waitTime={waitTime}
                    setDepartamento={setDepartamento}
                    setCity={setCity}
                    />
                <Motivation />
                <MapView />
                <Contents 
                    id='donacion'
                    departamento={departamento}
                    city={city}
                    waitTime={waitTime}
                    name={`CAUSAS PARA DONAR`}
                    />
                <Contents 
                    id='emprendimiento'
                    departamento={null}
                    city={null}
                    waitTime={waitTime}
                    name={`INICIATIVAS Y \n EMPRENDIMIENTOS`}
                     />
                <Staff />
            </Fragment>
        );
    }
}

export default Home;