import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import { Layout, Card, Col, Row, Spin } from 'antd';
import Report from './Report';
import CardContainer from './CardContainer';
import logo from './logo.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const { Header, Footer, Content } = Layout;

const ReportWrapper = ({ match }) => {
  const uuId = parseInt(match.params.id);
  return (<Report uuId={uuId} ></Report>)
}

class App extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    loading: false,
  }

  render() {
    return (
      <Router>
      <Layout className='app'>
      <Header className='header'>
        <img src={logo} className='logo'></img>
        <h1>桥梁报表分析平台</h1>
      </Header>
      <Content className='content'>
        <Spin size='large' tip='数据分析中...' spinning={this.props.loading}>
        <Route exact path="/:id?" component={ReportWrapper} ></Route>
        <Route path="/report/:id?" component={ReportWrapper} ></Route>
        </Spin>
      </Content>
      <Footer className='footer'>
          智行科技 ©2018 Copyright
      </Footer>
    </Layout>
    </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.loading
});

const mapDispatchToProps = (state) => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
