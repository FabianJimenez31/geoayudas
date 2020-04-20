import React from 'react';
// Ant Components
//import {Row,Col} from 'antd';
// Component
import MarkerLocation from '../Micro/maps/markerlocation';
import PaperPlane from '../Micro/paperPlane';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import PopUpCard from '../Micro/maps/popupcard';
import MapFilter from '../Meso/mapFilter';
import MapCarousel from '../Micro/maps/mapCarousel';
// Function 
import {ServerData} from '../commonFunctions';
// Holder to map 
// const locations = require('../sharedContents/locations.json');


class MapView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            viewportmap:{
                width:'100%',
                height:'100%',
                latitude:4.598185,
                longitude:-74.075962,
                zoom:5
            },
            localZone:null,
            initiatives:null,
            initiativesFilter:null,
            currentinitiative:null,
            iniciativasEmprendimientosID:3,// ID TO Filters
            institucionesFundacionesID:1,
            poblacionVulnerable:2
        }
        
    }
    
    CheckIniciativas = async () =>{
        let data = await ServerData(`/iniciativas/`);
        if(data){
            this.setState(()=>({initiatives:data}))
        }
    }

    // Get User Location
    GetLocation(state){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>state.setState({viewportmap:{width:'100%',
            height:'100%',latitude:position.coords.latitude,longitude:position.coords.longitude,zoom:10},localZone:{width:'100%',
            height:'100%',latitude:position.coords.latitude,longitude:position.coords.longitude,zoom:13}}),((res)=>{
                if(res.code ===1){
                    state.setState({localZone:state.state.viewportmap});
                }
            }));
    }
    }
    GoToLocalZone(context,location){
        console.log(location);
        context.setState(()=>({viewportmap:location}));
    }
    FilterByName(context,text){
        context.setState(()=>({initiativesFilter:context.state.initiatives.filter((el)=>el.nombre.toLowerCase().includes(text))}));
       // console.log(text);
       
    }
    FilterByType(context,type){
        context.setState(()=>({initiativesFilter:context.state.initiatives.filter((el)=>el.tipo.id === type)}));
    }
    ClearFilterType(context){
        context.setState(()=>({initiativesFilter:null}));
    }

    componentDidMount(){
        this.GetLocation(this);   
    // TODO Ask server for Initiatives (All) ///////////////////////////////////////////////////////////////
    // set Initiatives to state 
        this.CheckIniciativas();
        //this.setState(()=>({initiatives:locations}))
        
    }
    
    componentDidUpdate(){
        //console.log(this.state.currentinitiative);
    }
    
    
    render(){
        const {initiatives,initiativesFilter, currentinitiative} = this.state;
        const toMap = initiativesFilter? initiativesFilter: initiatives;
        
        return<div id='mapview'>
            <div className='map_header'>
                
                    <div className={`map_title_element`}>
                        <PaperPlane classes={'paperplane'}/>
                    </div>
                    <div className={`map_title_element`}>
                        <p className='map-title'>
                        ENCUENTRA <br/> ZONAS DONDE <br/> PUEDES DONAR
                        </p>
                    </div>
                </div>
            <div className='map_holder'>
                <MapFilter 
                search={(text)=>{this.FilterByName(this,text)}}
                btn1={()=>{this.GoToLocalZone(this,this.state.localZone)}}
                btn2={()=>{this.FilterByType(this,this.state.iniciativasEmprendimientosID)}}
                btn3={()=>{this.FilterByType(this,this.state.institucionesFundacionesID)}}
                btn4={()=>{this.FilterByType(this,this.state.poblacionVulnerable)}}
                clear={()=>{this.ClearFilterType(this)}}
                />
                <ReactMapGL
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
                {...this.state.viewportmap}
                onViewportChange={(viewport)=>this.setState({viewportmap:viewport})}
                >
                    {toMap && toMap.map((location,id)=>{
                        return <Marker key={`location_${id}`} latitude={location.latitud} longitude={location.longitud}>
                                    <MarkerLocation 
                                    classes={location.tipo.id === 2 ? 'op1': 'op2'}
                                    action={()=>{this.setState(()=>({currentinitiative:location}))}}
                                    />
                                </Marker>
                    })}
                    {currentinitiative && <Popup latitude={currentinitiative.latitud} longitude={currentinitiative.longitud} onClose={()=>{this.setState(()=>({currentinitiative:null}))}}>
                        <PopUpCard element={currentinitiative}/>
                        </Popup>}
                </ReactMapGL>
                <MapCarousel elements={initiativesFilter ? initiativesFilter : initiatives}/>
            </div>
        </div>;
    }
}



export default MapView;