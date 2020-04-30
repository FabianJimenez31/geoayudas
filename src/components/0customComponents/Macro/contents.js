import React from 'react';
// Components
// import DetailInitiative from '../Meso/detailCard';
import ContentCarousel from '../Meso/contentCarousel';
// Function 
//import {ServerData} from '../commonFunctions';
// // Components Ant
// import { Modal } from 'antd';


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
        };
    }
    // State Functions
    CheckDepartamentos = async (inis) =>{
        //let data = await ServerData(`/departamentos`);
      if(inis){
          let data = Object.entries(inis).map((el,i)=>{
              return {nombre:el[0],id:el[1].id}
           }) ;
          //console.log('CheckDepartamentos: ',data);
          if(data){
              this.setState(()=>({departamentos:data, cities:null}));
          }
      }
       
    }
    CheckCities = async (id_departamento, iniciativas)=>{
        //const data = await ServerData(`/ciudades/${id_departamento}`);
       
            let data = Object.entries(iniciativas).filter((el)=>{
                return el[1].id === parseInt(id_departamento) ;
            })[0];
            data= Object.entries(data[1])[1][1];
            data = Object.entries(data).map((el,i)=>{
                return {
                    nombre:el[0],
                    id: el[1].id
                }
            });
            if(data){
                this.setState(()=>({cities: data,city:null,initiatives:null,initiative:null}));
            }
        
    }
    CheckInitiatives = async (id_departamento,id_city,iniciativas) =>{
       
        let data=Object.entries(iniciativas).filter((el)=>{
            return el[1].id === parseInt(id_departamento) ;
        })[0];
        data= Object.entries(data[1])[1][1];
        data = Object.entries(data).filter((el)=>{
            return el[1].id === parseInt(id_city) ;
        })[0];
        data = data[1].iniciativas;     
        if(data){
            this.setState(()=>({initiatives:data}));
        }
    };
    setDepartamento = (data)=>{
        //console.log(data);
        this.setState(()=>({departamento:data, cities:null, city: null, initiatives:null}))
    }
    setCity = (data) =>{
        this.setState(()=>({city:data,initiatives:null}))
    }
    setInitiatives = (data) => {
        this.setState(()=>({initiatives:data}))
    }
    // setInitiative = (data) => {
    //     this.setState(()=>({initiative:data}))
    // }
    
    // componentDidMount(){
    //     this.CheckDepartamentos();
    // }

    
    componentDidUpdate(){
        const {iniciativas} = this.props;
        const {departamento,departamentos, cities, city, initiatives} = this.state;
        if(iniciativas && !departamentos){
            this.CheckDepartamentos(iniciativas);
        }
        if(departamentos && !departamento)
        {
            this.setState(()=>({departamento:departamentos[0].id}));
        }
        if(departamento && !cities)
        {
            this.CheckCities(departamento,iniciativas);
        }
        if( cities && !city){
            this.setState(()=>({city:cities[0].id}));
        }
        if(city && !initiatives){
            this.CheckInitiatives(departamento, city, iniciativas);
        }
        if(this.props.departamento){
            this.props.resetMainDepartamento();
            this.setDepartamento(this.props.departamento);
        }
        if(this.props.city){
            this.props.resetMainCity();
            this.setCity(this.props.city);
        }
    }


    
    render(){
        // Variables and Refs
        const {
                departamentos,
                cities,
                city,
                initiatives,
                } = this.state;
        const {
                id,
                name,
                waitTime,
                iniciativas,
                setInitiative
                } = this.props;
        const {
                setCity,
                setDepartamento,
                } = this;

        if(iniciativas){
            // if(!this.state.departamentos){
            //     this.CheckDepartamentos(iniciativas);
            // }
        }

        return(
        <div id={id}>
            {/* <Modal
                        visible={initiative?true:false}
                        onCancel={()=>{setInitiative(null)}}
                        footer={null}
                        className="init_modal"
                        >
                             < DetailInitiative initiative={initiative} initiatives={initiatives}/>
            </Modal> */}
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
            // reseMainCity={reseMainCity}
            // resetMainDepartamento={resetMainDepartamento}
            />
        </div>);
    }
}



export default Contents;