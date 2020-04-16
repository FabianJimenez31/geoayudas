import React, { Fragment } from 'react';

// Components Ant
import {  Card, Carousel,Tabs, Layout } from 'antd';
// Components
import DefButton from '../Micro/defaultButton';
// Functions 
import {SlidesToShow} from '../commonFunctions';

const {TabPane} = Tabs;

//key

const TabsBar = ({
    id,
    tabs,
    tabs2,
    setDepartamento,
    setCurrentCity,
    currentcity,
    carouselWide,
    initiatives,
    setCarouselMk4,
    setInitiative
}) =>{
    return(
        <Tabs 
        defaultActiveKey={tabs && tabs[0].id} 
        className="custom-tab" onChange={(el)=>{setDepartamento(el)}}>
            {tabs && tabs.map((el,i)=>{
                return (
                <TabPane tab={el.nombre} key={`${el.id}`} className={`custom-tabpane`}>
                    {
                        tabs2 ? <Tabs 
                        defaultActiveKey={tabs2 && tabs2[0].id}
                         className="custom-tab" onChange={(el)=>{setCurrentCity(el)}}>
                        {
                             tabs2.map((el2,i2)=>{
                                return(
                                    <TabPane tab={el2.nombre} key={`${el2.id}`} className={`custom-tabpane`}>
                                        {
                                            parseInt(currentcity)  === el2.id ? 
                                            <div id='CarouselWide'>
                                                    <Carousel className='carousel_view_extended' ref={carouselWide} 
                                                    // autoplay
                                                    slidesToShow={initiatives? SlidesToShow(initiatives):1}
                                                    afterChange={setCarouselMk4} >
                                                        {initiatives && initiatives.map((el,i)=>{
                                                            return (<Card key={`${id}_card_carousel_${i}`} className='init_card'>
                                                                <img className='card_initiative_img' alt={`img_holder_${i}`} src='https://phassociation.org/wp-content/uploads/2017/04/iStock_000079377379_Medium.jpg'/>
                                                                <p className='card_title'>{el.direccion}</p>
                                                                <p className='card_desc'>{el.url}</p>
                                                                <DefButton title={`Contactar`} classes={`wide`} action={()=>setInitiative(el.id)}/>
                                                            </Card>);
                                                        })}
                                                    </Carousel>
                                            </div>
                                                :
                                            'Loading ...'
                                        }
                                    </TabPane>
                                );
                            })
                        }        
                        </Tabs> : 'Loading ...'
                    }
                </TabPane>);
            })} 
        </Tabs>
    );
};


export default TabsBar;