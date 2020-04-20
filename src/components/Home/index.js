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

// Routes 
const routes = require('../0customComponents/sharedContents/id_routes.json');

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
            departamento:params
        }))
    }
     setCity = (params) =>{
        this.setState(()=>({city:params}))
    }
    resetMainCity = () =>{
        this.setState(()=>({city:null}))
    }
    resetMainDepartamento = () =>{
        this.setState(()=>({departamento:null,city:null}))
    }
    
     componentDidMount (){
        ResizeBackGroundImages();
        
        window.addEventListener('resize',function(){ResizeBackGroundImages();});
        window.addEventListener('orientationchange',function(){ResizeBackGroundImages();});
    }

    // componentDidUpdate(){
    //     console.log(this.state);
    // }


    render (){
        // Variables and Functions 
        const {
                departamento,
                city,
            } = this.state;
        const waitTime = 2000;
        const {
                setCity,
                setDepartamento,
                resetMainDepartamento,
                resetMainCity
                }= this;
        
       

        return (
            <Fragment>
                <Initial 
                    id={`${routes[0].name}`}
                    waitTime={waitTime}
                    setDepartamento={setDepartamento}
                    setCity={setCity}
                    />
                <Motivation 
                    id={`${routes[1].name}`}
                    />
                <MapView 
                    id={`${routes[2].name}`}
                />
                <Contents 
                    id={`${routes[3].name}`}
                    departamento={departamento}
                    city={city}
                    resetMainDepartamento={resetMainDepartamento}
                    resetMainCity={resetMainCity}
                    waitTime={waitTime}
                    name={`CAUSAS PARA DONAR`}
                    />
                <Contents 
                    id={`${routes[4].name}`}
                    departamento={null}
                    city={null}
                    resetMainDepartamento={resetMainDepartamento}
                    resetMainCity={resetMainCity}
                    waitTime={waitTime}
                    name={`INICIATIVAS Y \n EMPRENDIMIENTOS`}
                     />
                <Staff
                    id={`${routes[5].name}`}
                />
            </Fragment>
        );
    }
}

export default Home;