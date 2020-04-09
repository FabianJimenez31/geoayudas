import React, { Component } from 'react';
import { Layout } from 'antd';
import { HeaderComponent } from './header';

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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default Template;
