import React, { Component } from 'react';
import { Layout } from 'antd';
import { HeaderComponent } from './header';
//Icons
import {MailOutlined,WhatsAppOutlined} from '@ant-design/icons';

const ids = require('../components/0customComponents/sharedContents/id_routes.json');

const { Content, Footer } = Layout;

class Template extends Component {
  wrapper;
  constructor(props) {
    super(props);

    this.wrapper = React.createRef();
  }

  render() {
    return (
      <Layout className="layout">
        <HeaderComponent />
        <Content>
          <div className="site-layout-content" ref={this.wrapper}>
            {this.props.children}
          </div>
        </Content>
        <Footer className={'footer'}>
          <p className='title' id={ids[6].name}>Contacto :</p>
          <p className='tel'><a href={typeof InstallTrigger !== 'undefined' ?"tel:573015191310":"https://wa.me/573015191310"}><WhatsAppOutlined /> +57 3015191310</a></p>
          <p className='email'><a href='mailto:angeliqueduque@gmail.com'><MailOutlined /> angeliqueduque@gmail.com</a></p>
          <p className='mark'>©2020 Created by GeoAyudas</p>
          </Footer>
      </Layout>
    );
  }
}

export default Template;
