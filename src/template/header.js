import React from 'react';
import { Layout, Menu,Row,Col } from 'antd';
const routes = require('../components/0customComponents/sharedContents/id_routes.json'); 
// import { Link } from 'react-router-dom';


const { Header } = Layout;


function MainLogo (){
  return <div className={`logo-holder`}>
          <img src='assets/logo.png' alt='logo' className={`main-logo`}/>
          <h2 className={`main-logo`}>
            <span className={`main-logo color2`}>
              GEO
            </span>
            <span className={`main-logo color1`}>
              AYUDAS
            </span>
          </h2>
          </div>

}

export const HeaderComponent = () =>(    
    <Header className={`header`}>
      <Row justify='start' align="middle">
        <Col xs={24} lg={6} >
          < MainLogo />
        </Col>
        <Col xs={24} lg={18} >
          <Menu mode="horizontal" className={`header-menu`} defaultSelectedKeys={['home']}>
            <Menu.Item key="home"><a href={`#${routes[0].name}`}>INICIO</a></Menu.Item>
            <Menu.Item key="mision"><a href={`#${routes[1].name}`}>NUESTRA MOTIVACION</a></Menu.Item>
            <Menu.Item key="donate"><a href={`#${routes[3].name}`}>DONDE PUEDO DONAR</a></Menu.Item>
            <Menu.Item key="staff"><a href={`#${routes[5].name}`}>NUESTRO EQUIPO</a></Menu.Item>
            <Menu.Item key="contact"><a href={`#`}>CONTACTANOS</a></Menu.Item>
          </Menu>
        </Col>
      </Row>
  </Header>
  );