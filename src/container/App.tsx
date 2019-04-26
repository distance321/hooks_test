import { Layout } from 'antd';
import React, { PureComponent } from 'react'
import BasicRoute from '../routes/routes'
const { Header, Footer, Sider, Content} = Layout;

class App extends PureComponent{
  render() {
    return (
      <Layout style={{height:'100%'}}>
          <Sider>Sider</Sider>
          <Layout>
            <Header>Header</Header>
            <Content style={{padding:20}}><BasicRoute/></Content>
            <Footer>Footer</Footer>
          </Layout>
      </Layout>
    )
  }
}

export default App