import React from 'react';
// Components
import DetailInitiative from '../Meso/detailCard';
import ContentCarousel from '../Meso/contentCarousel';
// Function 
import {ServerData} from '../commonFunctions';
// Components Ant
import { Modal } from 'antd';


class Contents extends React.Component{
    constructor (props){
        super(props);
        this.props = props;
        this.state= {
            departamentos:null,
            departamento:null,
            cities:null,
            city:null,
            initiatives:null,
            initiative:null
        };
    }
    // State Functions
    CheckDepartamentos = async () =>{
        let data = await ServerData(`/departamentos`);
        if(data){
            this.setState(()=>({departamentos:data, cities:null}));
        }
    }
    CheckCities = async (id_departamento)=>{
        const data = await ServerData(`/ciudades/${id_departamento}`);
        if(data){
            this.setState(()=>({cities: data,city:null,initiatives:null,initiative:null}));
        }
    }
    CheckInitiatives = async (id_city) =>{
       
        const data = await ServerData(`/iniciativas/${id_city}/`);
        if(data){
            this.setState(()=>({initiatives:data}));
        }
    };
    setDepartamento = (data)=>{
        this.setState(()=>({departamento:data, cities:null}))
    }
    setCity = (data) =>{
        this.setState(()=>({city:data}))
    }
    setInitiatives = (data) => {
        this.setState(()=>({initiatives:data}))
    }
    setInitiative = (data) => {
        this.setState(()=>({initiative:data}))
    }
    
    componentDidMount(){
        this.CheckDepartamentos();
    }

    
    componentDidUpdate(){
        const {departamento,departamentos, cities, city, initiatives} = this.state;
        if(departamentos && !departamento)
        {
            this.setState(()=>({departamento:departamentos[0].id}));
        }
        if(departamento && !cities)
        {
            this.CheckCities(departamento);
        }
        if( cities && !city){
            this.setState(()=>({city:cities[0].id}));
        }
        if(city && !initiatives){
            this.CheckInitiatives(city);
        }
    }


    
    render(){
        // Variables and Refs
        const {
                departamentos,
                cities,
                city,
                initiatives,
                initiative,
                } = this.state;
        const {
                id,
                name,
                waitTime,
                resetMainDepartamento,
                reseMainCity
                } = this.props;
        const {
                setInitiative,
                setCity,
                setDepartamento,
                } = this;



        return(
        <div id={id}>
            <Modal
                        visible={initiative?true:false}
                        onCancel={()=>{setInitiative(null)}}
                        footer={null}
                        className="init_modal"
                        >
                             < DetailInitiative initiative={initiative} initiatives={initiatives}/>
            </Modal>
            <ContentCarousel
            id={id}
            name={name}
            // departamento={departamento}
            departamentos={departamentos}
            waitTime={waitTime}
            tabs={departamentos}
            tabs2={cities}
            setCurrentCity={setCity}
            setDepartamento={setDepartamento}
            currentcity={city}
            initiatives={initiatives}
            setInitiative={setInitiative}
            mainDepartamento={this.props.departamento}
            mainCity = {this.props.city}
            reseMainCity={reseMainCity}
            resetMainDepartamento={resetMainDepartamento}
            />
        </div>);
    }
}



export default Contents;