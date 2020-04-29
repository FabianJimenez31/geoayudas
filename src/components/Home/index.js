import React, {Fragment} from 'react';
// Components of the website
import Initial from '../0customComponents/Macro/initial';
import Motivation from '../0customComponents/Macro/motivation';
import MapView from '../0customComponents/Macro/mapView';
import Contents from '../0customComponents/Macro/contents';
import Staff from '../0customComponents/Macro/staff';
import DetailInitiative from '../0customComponents/Meso/detailCard';
// Components Ant
import { Modal } from 'antd';

// Functions 
import { ResizeBackGroundImages,ClassifyInitiatives, ServerData} from '../0customComponents/commonFunctions';

// Routes 
//const initiatives_holder = require('../0customComponents/sharedContents/locations.json');
const routes = require('../0customComponents/sharedContents/id_routes.json');

class  Home extends React.Component {

    constructor(props){
        super(props);
        this.state={
            departamento:null,
            city:null,
            allIniciatives:null,
            organizedAllIniciatives:null,
            donaciones:null,
            otras:null,
            initiative:null
        }
    }

    // State Functions
    setInitiative=(params)=>{
        this.setState(()=>({
            initiative:params
        }));
    }
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
    CheckIniciativas = async () =>{
        let data = await ServerData(`/iniciativas/`);
        // },1000);
        if(data){    
           // SET INICIATIVES
        // setTimeout(()=>{
            this.setState(()=>({allIniciatives:data}));
            this.setState(()=>({organizedAllIniciatives:ClassifyInitiatives(data)}));
            // Divide donations from other 
            // donaciones => 3 - ayudas economicas
            let donaciones = data.filter((el)=> {
                return el.sector.id === 3;
            });
            this.setState(()=>({donaciones:ClassifyInitiatives(donaciones)}));
            // otras => !3 - fundaciones y/o emprendimientos 
            let otras = data.filter((el)=> {
                return el.sector.id !== 3;
            });
            this.setState(()=>({otras:ClassifyInitiatives(otras)}));
        }
    }
    
     componentDidMount (){
        ResizeBackGroundImages();
        // TODO ASK FOR INICIATIVES //////////////////////////////////////////////
        this.CheckIniciativas();
        
        
        window.addEventListener('resize',function(){ResizeBackGroundImages();});
        window.addEventListener('orientationchange',function(){ResizeBackGroundImages();});
    }

    // componentDidUpdate(){
    //     console.log('Filtered Donaciones: ',this.state.otras);
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
                 <Modal
                        visible={this.state.initiative?true:false}
                        onCancel={()=>{this.setInitiative(null)}}
                        footer={null}
                        className="init_modal"
                        >
                        < DetailInitiative 
                        initiative={this.state.initiative} 
                        // initiatives={initiatives}
                        />
                </Modal>
                <Initial 
                    id={`${routes[0].name}`}
                    waitTime={waitTime}
                    setDepartamento={setDepartamento}
                    setCity={setCity}
                    organizedInitiatives={this.state.donaciones}
                    />
                <Motivation 
                    id={`${routes[1].name}`}
                    />
                <MapView 
                    id={`${routes[2].name}`}
                    allIniciatives={this.state.allIniciatives}
                    setInitiative={this.setInitiative}
                />
                <Contents 
                    id={`${routes[3].name}`}
                    departamento={departamento}
                    city={city}
                    iniciativas={this.state.donaciones}
                    resetMainDepartamento={resetMainDepartamento}
                    resetMainCity={resetMainCity}
                    waitTime={waitTime}
                    name={`CAUSAS PARA DONAR`}
                    setInitiative={this.setInitiative}
                    />
                <Contents 
                    id={`${routes[4].name}`}
                    departamento={null}
                    city={null}
                    iniciativas={this.state.otras}
                    resetMainDepartamento={resetMainDepartamento}
                    resetMainCity={resetMainCity}
                    waitTime={waitTime}
                    name={`INICIATIVAS Y \n EMPRENDIMIENTOS`}
                    setInitiative={this.setInitiative}
                     />
            </Fragment>
        );
    }
}

export default Home;

// <Staff id={`${routes[5].name}`}/>
