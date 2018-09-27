import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Line, Area, Bar, CartesianGrid } from 'recharts';
import { connect } from 'react-redux';


class Report extends Component {

    static propTypes = {
        uuId: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired,
        measures: PropTypes.object.isRequired
    };
    static defaultProps = {
        uuId: -1,
        data: [],
        measures: {}
    };

    state = {
        year: 0,
    }

    constructor(props) {
        super(props);
        this.props.loadReport(props.uuId);
    }


    render() {
        const data = this.props.data;
        const measures = data[0] ? Object.getOwnPropertyNames(data[0]).filter((m) => (m !== 'year')): [];
        return (
            <Row gutter={16}>
                {
                    measures.map((measure, index) => (
                      <Col span={12} key={index}>
                        <ComposedChart width={730} height={250} data={this.props.data}>
                            <XAxis dataKey="year" name="年" label={{ value: "年", position: 'insideBottomRight'}}/>
                            <YAxis dataKey={measure} name={this.props.measures[measure].text} label={{ value: this.props.measures[measure].text, angle: 90, position: 'insideLeft' }}/>
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Area type="monotone" dataKey={measure} fill="#8884d8" stroke="#8884d8" name={this.props.measures[measure].text} />
                            <Bar dataKey={measure} barSize={20} fill="#413ea0" name={this.props.measures[measure].text} />
                            <Line type="monotone" dataKey={measure} stroke="#ff7300" name={this.props.measures[measure].text} />
                        </ComposedChart>
                    </Col>
                    ))
                }
            </Row>
        );
    }
};

const mapStateToProps = state => {
    return {
       data: filterReport(state.currentReportId, state.reports),
       measures: { ...state.measures }, 
    };
}

const filterReport = (uuId, reports) => {
    return reports[uuId] ? [...reports[uuId].data]: [];
};



const mapDispatchToProps = dispatch => {
    return {
       loadReport: (uuId) => {
           dispatch({
               type: 'LOAD',
               payload: uuId
           })
       }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report)
