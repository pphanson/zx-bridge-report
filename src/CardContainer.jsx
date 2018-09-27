import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Card, Col, Row } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';

class CardContainer extends Component {

    static propTypes = {
        data: PropTypes.array.isRequired,
        measures: PropTypes.object.isRequired,
    };    
    static defaultProps = {
        data: [],
        measures: {},
    };

  
    render() {
        return (
         <Row gutter={16}>
          {
            this.props.data.map((item, index) => (
              <Col span={8} key={index}>
              <Link to={`/report/${index}`} >
                <Card title={item.name} bordered={false} className='card' hoverable={true} >
                  <Row>
                  {
                    Object.getOwnPropertyNames(this.props.measures).map((m, index) =>(
                      <Col key={index} span={12} style={{textAlign: 'left'}}>
                        <label style={{ fontWeight: 'bold', marginRight: '1rem'}}>{this.props.measures[m].text}:</label>
                        <label>{this.props.data[index] ? this.props.data[index].data[4][m]: ''}</label>
                      </Col>
                    ))
                  }
                  </Row>
                </Card>
              </Link>
            </Col>
            ))
          }
        </Row>);
    }
};

const mapStateToProps = state => {
  return {
      data: [...state.reports],
      measures: {...state.measures}
  };
}


const mapDispatchToProps = dispatch => {
  return {
     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer)

