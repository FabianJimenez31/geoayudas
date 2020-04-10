import React from 'react';
import { Layout, Menu,Row,Col } from 'antd';
import { Link } from 'react-router-dom';


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
            <Menu.Item key="home"><Link to={`/`}>INICIO</Link></Menu.Item>
            <Menu.Item key="mision"><Link to={`/mision`}>NUESTRA MOTIVACION</Link></Menu.Item>
            <Menu.Item key="donate"><Link to={`/donate`}>DONDE PUEDO DONAR</Link></Menu.Item>
            <Menu.Item key="staff"><Link to={`/staff`}>NUESTRO EQUIPO</Link></Menu.Item>
            <Menu.Item key="contact"><Link to={`/contact`}>CONTACTANOS</Link></Menu.Item>
          </Menu>
        </Col>
      </Row>
  </Header>
  );