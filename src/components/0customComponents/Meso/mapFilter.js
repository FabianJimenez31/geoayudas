import React from 'react';
// Ant Component
import { Input,Button } from 'antd';
const {Search} = Input;


const MapFilter = ({search,btn1,btn2,btn3,btn4,clear}) =>{
    const [boton,setBoton] = React.useState(null);



    return(<div className='map_filter_holder'>
        <Search placeholder="Buscar Iniciativas o Poblacion Vulnerable" className={`searchbar`} onChange={(e)=>{
            e.preventDefault();
            const text = e.target.value;
            if(boton){
                setBoton(null);
                clear();
            }
            search(text);

        }}/>
        <div className='row'>
        <Button className={`filter_button`} onClick={btn1}>
            UBICAR MI ZONA
        </Button>
        <Button className={`no_mobile filter_button ${boton === 2 && 'selected'}`} onClick={()=>{
            if(!boton){
                setBoton(2);
                btn2();
            }else{
                setBoton(null);
                clear();
            }
        }}>
           EMPRENDIMIENTOS
        </Button>
        </div>
        <div className='row'>

        <Button className={`no_mobile filter_button ${boton === 3 && 'selected'}`} onClick={()=>{
            if(!boton){
                setBoton(3);
                btn3();
            }else{
                setBoton(null);
                clear();
            }
        }}>
            INSTITUCIONES Y FUNDACIONES
        </Button>
        <Button className={`no_mobile filter_button ${boton === 4 && 'selected'}`} onClick={()=>{
            if(!boton){
                setBoton(4);
                btn4();
            }else{
                setBoton(null);
                clear();
            }
        }}>
            POBLACION VULNERABLE
        </Button>
        </div>
    </div>);
};

export default MapFilter;