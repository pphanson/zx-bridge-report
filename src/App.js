import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Layout, Card, Col, Row } from 'antd';
import Report from './Report';
import CardContainer from './CardContainer';
import logo from './logo.png'
const { Header, Footer, Content } = Layout;

const ReportWrapper = ({ match }) => {
  const uuId = parseInt(match.params.id);
  return (<Report uuId={uuId} ></Report>)
}

class App extends Component {

  render() {
    return (
      <Router>
      <Layout className='app'>
      <Header className='header'>
        <img src={logo} className='logo'></img>
        <h1>桥梁报表分析平台</h1>
      </Header>
      <Content className='content'>
        <Route exact path="/:id?" component={ReportWrapper} ></Route>
        <Route path="/report/:id?" component={ReportWrapper} ></Route>
      </Content>
      <Footer className='footer'>
          智行科技 ©2018 Copyright
      </Footer>
    </Layout>
    </Router>
    );
  }
}

export default App;
