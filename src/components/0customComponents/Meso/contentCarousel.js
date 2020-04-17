import React, { useRef, useState, Fragment } from 'react';
// Components Ant
import {  Card, Carousel,Tabs, Layout, Row, Col, Button, Steps } from 'antd';
// Components
import DefButton from '../Micro/defaultButton';
// Icons 
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
// Functions 
import {SlidesToShow, IndexWrap} from '../commonFunctions';

const {TabPane} = Tabs;
const {Header, Footer,Content} = Layout;
//


const CMk4Up = (refe,item,waitTime,setCarouselMk4,carouselMk4) => {
    setCarouselMk4(IndexWrap(item,(carouselMk4-1)));
    refe.current.slick.slickPause();
    setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
    refe.current.slick.slickPrev();
}
const CMk4Down = (refe,item,waitTime,setCarouselMk4,carouselMk4) => {
    setCarouselMk4(IndexWrap(item,(carouselMk4+1)));
    refe.current.slick.slickPause();
    setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
    refe.current.slick.slickNext();
}
const CMk4Goto = (refe,item,waitTime,setCarouselMk4) => {
    setCarouselMk4(item);
    refe.current.slick.slickPause();
    setTimeout(()=>{refe.current.slick.slickPlay();},waitTime);
    refe.current.slick.slickGoTo(item);
}


const ContentCarousel = ({
    id,
    name,
    departamento,
    departamentos,
    waitTime,
    tabs,
    tabs2,
    setCurrentCity,
    setDepartamento,
    currentcity,
    initiatives,
    setInitiative,
}) => {
    let carouselWide = useRef(0);
    //state
    const [carouselMk4,setCarouselMk4] = useState(0);
    let initiatives_array = null;

    // TODO => filtrar si es emprendimiento o causa
    // Dividing array to create cards groups
    let main = null;
    if(initiatives){main = Math.ceil(initiatives.length/SlidesToShow(initiatives))}
    if(initiatives && main){
        let jump = SlidesToShow(initiatives);
        initiatives_array = [];
        for(let i = 0 ; i<main;i++){
            initiatives_array.push([]);
        }
        let x =0;
        for(let i = 0; i<initiatives.length; i++){
            if(x === 0 && i === jump){x++}else if(i >= x*jump ){x++}
            initiatives_array[x-1].push(initiatives[i])
        }
    }
    const littleTabs = () =>{
        let elements = [];
        for(let i = 0; i < main; i++){
            if(elements.length < 3){
                elements.push(<li key={`carouselSlide_${i}`}><button className={carouselMk4 === i ? 'selected':''}></button></li>);
            }
        }
        return elements;
    };
    
    return(
      
        <Layout className='mock-4'>
                <Header>
                    <h2 className="title_on_white">{name}</h2>
                </Header>
                <Content>
                    
                    <Row>
                        <Col >
                        {
                        departamentos &&
                        <Tabs 
                        defaultActiveKey={tabs && tabs[0].id} 
                        className="custom-tab" 
                        onChange={(el)=>{
                            setDepartamento(el);
                            setCarouselMk4(0);
                            
                            }}>
                            {tabs && tabs.map((el,i)=>{
                                return (
                                <TabPane tab={el.nombre} key={`${el.id}`} className={`custom-tabpane`}>
                                    {
                                        tabs2 ? <Tabs 
                                        defaultActiveKey={tabs2 && tabs2[0].id}
                                        className="custom-tab" 
                                        onChange={(el)=>{
                                            setCurrentCity(el);
                                            setCarouselMk4(0);
                                            
                                            }}>
                                        {
                                            tabs2.map((el2,i2)=>{
                                                return(
                                                    <TabPane tab={el2.nombre} key={`${el2.id}`} className={`custom-tabpane`}></TabPane>
                                                );
                                            })
                                        }        
                                        </Tabs> : 'Loading ...'
                                    }
                                </TabPane>);
                            })} 
                        </Tabs>
                        }
                    </Col>
                </Row>
                <Row>
                {
                    //parseInt(currentcity)  === el2.id ? 
                    <Col className='carousel_custom'>
                    <div >
                            <Carousel 
                            className='carousel_view_extended' 
                            ref={carouselWide} 
                            autoplay
                            slidesToShow={1}//{initiatives? SlidesToShow(initiatives):1}
                            afterChange={(el)=>setCarouselMk4(el)} 
                            >
                                
                                {
                                    
                                    initiatives_array ? 
                                    initiatives_array.map((el,i)=>{
                                        return  (
                                            <div style={{display:'flex!important', flexDirection:'row'}} className={'carousel_groups'} key={`${id}_card_carousel_${i}`}>
                                            {el.map((el2,i2)=>{
                                                return (
                                                <Card key={`${id}_card_carousel_${i2}`} className='init_card'>
                                                <img className='card_initiative_img' alt={`img_holder_${i}`} src='https://phassociation.org/wp-content/uploads/2017/04/iStock_000079377379_Medium.jpg'/>
                                                <p className='card_title'>{el2.direccion}</p>
                                                <p className='card_desc'>{el2.url}</p>
                                                <DefButton title={`Contactar`} classes={`wide`} action={()=>setInitiative(el2.id)}/>
                                                </Card>
                                                )
                                            })}
                                            </div>)
                                    })
                                    : <div>Loading ...</div>

                                }
                            </Carousel>
                    </div>
                    </Col>
                }
               
                </Row>
            </Content>
            <Footer>
                {/* ControllerCarousel ({currentSlide, up , down, actionTabs, slides}) */}
                {initiatives && carouselWide  ?
                // <ControllerCarousel currentSlide={carouselMk4} up={CMk4Up} down={CMk4Down} actionTabs={CMk4Goto} slides={initiatives}/>
                <div className='carousel-controller bk-white'>
                <Button shape='circle' icon={<LeftOutlined />} onClick={()=>CMk4Up(carouselWide, initiatives,waitTime,setCarouselMk4,carouselMk4)}/>
                <Button shape='circle' icon={<RightOutlined />} onClick={()=>CMk4Down(carouselWide, initiatives,waitTime,setCarouselMk4,carouselMk4)}/>
                <span>{carouselMk4+1 > 9 ? carouselMk4+1 :`0${carouselMk4+1}`}</span>
                <ul className={`cus-controlller`}>
                    {
                       littleTabs()
                    }
                    {/* {initiatives.map((el,i) => 
                        <li key={`carouselSlide_${i}`}><button className={carouselMk4 === i ? 'selected':''} onClick={()=>{CMk4Goto(carouselWide ,i,waitTime,setCarouselMk4,carouselMk4)}}></button></li>)} */}
                </ul>
                <span>{main && main > 9 ? main :`0${main}`}</span>
                <div className='line'></div>
                </div>
                :
                ''
                }
            </Footer>
            </Layout>
    );
};

                        

export default ContentCarousel;