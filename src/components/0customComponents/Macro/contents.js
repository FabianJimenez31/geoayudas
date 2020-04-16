import React from 'react';
import {IndexWrap} from '../commonFunctions';
// Components
import DetailInitiative from '../Meso/detailCard';
import TabsBar from '../Meso/tabsBar';
// Icons 
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
// Function 
import {ServerData} from '../commonFunctions';
// Components Ant
import { Row, Col, Button, Layout,Modal } from 'antd';
const {Header, Footer,Content} = Layout;


class Contents extends React.Component{
    constructor (props){
        super(props);
        this.props = props;
        this.state= {
            carouselMk4:0,
            departamentos:null,
            departamento:null,
            cities:null,
            city:null,
            initiatives:null,
            initiative:null
        };
    }
    // State Functions
    setCarouselMk4 = (params) => {
        this.setState({carouselMk4:params})
    }
    CheckDepartamentos = async () =>{
        let data = await ServerData(`/departamentos`);
        console.log('departamentos',data);
        if(data){
            this.setState(()=>({departamentos:data, cities:null}));
        }
    }
    CheckCities = async (id_departamento)=>{
        const data = await ServerData(`/ciudades/${id_departamento}`);
        console.log('ciudades',data);
        if(data){
            this.setState(()=>({cities: data,city:null,initiatives:null,initiative:null}));
        }
    }
    CheckInitiatives = async (id_city) =>{
        console.log('id city', id_city);
        const data = await ServerData(`/iniciativas/${id_city}`);
        if(data){
            console.log(data);
            //this.setState(()=>({}));
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
        const carouselWide = React.createRef();
        const {
                carouselMk4,
                departamentos,
                departamento,
                cities,
                city,
                initiatives,
                initiative,
                } = this.state;
        const {
                id,
                name,
                waitTime,
                } = this.props;
        const {
                setCarouselMk4,
                setInitiative,
                setCity,
                setDepartamento,
                } = this;

        const CMk4Up = () => {
            setCarouselMk4(IndexWrap(initiatives,(carouselMk4-1)));
            carouselWide.current.slick.slickPause();
            setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
            carouselWide.current.slick.slickPrev();
        }
        const CMk4Down = () => {
            setCarouselMk4(IndexWrap(initiatives,(carouselMk4+1)));
            carouselWide.current.slick.slickPause();
            setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
            carouselWide.current.slick.slickNext();
        }
        const CMk4Goto = (item) => {
            setCarouselMk4(item);
            carouselWide.current.slick.slickPause();
            setTimeout(()=>{carouselWide.current.slick.slickPlay();},waitTime);
            carouselWide.current.slick.slickGoTo(item);
        }


        return(
        <div id={id}>
            <Layout className='mock-4'>
                <Header>
                    <h2 className="title_on_white">{name}</h2>
                </Header>
                <Content>
                    <Modal
                        visible={initiative?true:false}
                        onCancel={()=>{setInitiative(null)}}
                        footer={null}
                        className="init_modal"
                        >
                             < DetailInitiative initiative={initiative} initiatives={initiatives}/>
                    </Modal>
                    <Row>
                        <Col >
                        {
                        departamentos &&
                        <TabsBar 
                        id={id}
                        tabs={departamentos}
                        tabs2={cities}
                        setCurrentCity={setCity}
                        setDepartamento={setDepartamento}
                        currentcity={city}
                        carouselWide={carouselWide}
                        initiatives={initiatives}
                        setCarouselMk4={setCarouselMk4}
                        setInitiative={setInitiative}
                        />
                        }
                        </Col>
                    </Row>
                </Content>
                <Footer>
                    {/* ControllerCarousel ({currentSlide, up , down, actionTabs, slides}) */}
                    {initiatives  ?
                    // <ControllerCarousel currentSlide={carouselMk4} up={CMk4Up} down={CMk4Down} actionTabs={CMk4Goto} slides={initiatives}/>
                    <div className='carousel-controller bk-white'>
                    <Button shape='circle' icon={<LeftOutlined />} onClick={CMk4Up}/>
                    <Button shape='circle' icon={<RightOutlined />} onClick={CMk4Down}/>
                    <span>{carouselMk4+1 > 9 ? carouselMk4+1 :`0${carouselMk4+1}`}</span>
                    <ul className={`cus-controlller`}>
                        {initiatives.map((el,i) => <li key={`carouselSlide_${i}`}><button className={carouselMk4 === i ? 'selected':''} onClick={()=>{CMk4Goto(i)}}></button></li>)}
                    </ul>
                    <span>{initiatives.length > 9 ? initiatives.length :`0${initiatives.length}`}</span>
                    <div className='line'></div>
                    </div>
                    :
                    ''
                    }
                </Footer>
            </Layout>
        </div>);
    }
}



export default Contents;