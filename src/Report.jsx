import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Menu, Dropdown, Icon} from 'antd';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Tooltip, Legend, Line, Area, Bar, CartesianGrid, Label } from 'recharts';
import { connect } from 'react-redux';
import { Link  } from "react-router-dom";
import  { withRouter } from 'react-router';
import  './Report.css';

class Report extends Component {

    static propTypes = {
        uuId: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired,
        measures: PropTypes.object.isRequired,
        bridges: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
    };
    static defaultProps = {
        uuId: -1,
        data: [],
        measures: {},
        bridges: [],
        name: '显示桥梁名称'
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
        const latest = this.props.data.length-1;
        const measures = data[latest] ? Object.getOwnPropertyNames(data[0]).filter((m) => (m !== 'year')): [];
        const menu = <Menu onClick={this.props.selectBridge}>
            {
                this.props.bridges.map((bridge, index) => (
                    <Menu.Item key={index}>
                        <Link  to={`/report/${bridge.uuid}`}>{bridge.name}</Link>
                    </Menu.Item>
                ))
            }
        </Menu>
       
        return ([
            <Row gutter={16}>
                <Col span={6}>
                    <Card  className='infoCard'>
                        <Dropdown overlay={menu} className='bridges_list' trigger={['click']}>
                        <div>
                            请选择<Icon type="down" />
                        </div>
                    </Dropdown>
                        {this.props.name}
                    </Card>
                </Col>
                <Col span={6}>
                            <Card  style={{ background: '#383d3d', borderRadius: '15px', height: '120px'}}>
                            <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
                            <label className='property'>
                                { this.props.measures['edge_count'].text }
                            </label>
                            <div className='value'>
                            <label className='value'>
                               { data[latest] ? data[latest]['edge_count'] : NaN }
                            </label>
                            </div>
                            </Card.Grid>
                            <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
                            <label className='property'>
                            { this.props.measures['edge_length'].text }
                            </label>
                        <div className='value'>
                        <label>
                        { data[latest] ? data[latest]['edge_length'] : NaN }
                        </label>
                        </div>
                            </Card.Grid>
                            </Card>
                </Col>
                <Col span={6}>
                <Card style={{ background: '#383d3d' , borderRadius: '15px', height: '120px'}}>
                <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
                <label className='property'>
                    { this.props.measures['edge_less_015_count'].text }
                </label>
                <div className='value'>
                <label>
                { data[latest] ? data[latest]['edge_less_015_count'] : NaN }
                </label>
                </div>
                </Card.Grid>
                <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
                <label className='property'>
                { this.props.measures['edge_less_015_length'].text }
                </label>
                <div className='value'>
                <label>
                { data[latest] ? data[latest]['edge_less_015_length'] : NaN }
                </label>
                </div>
                </Card.Grid>
                </Card>
    </Col>
    <Col span={6}>
    <Card  style={{ background: '#383d3d' , borderRadius: '15px', height: '120px'}}>
    <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
    <label className='property'>
        { this.props.measures['edge_more_015_count'].text }
    </label>
    <div className='value'>
                <label>
                { data[latest] ? data[latest]['edge_more_015_count'] : NaN }
                </label>
                </div>
    </Card.Grid>
    <Card.Grid style={{width: "50%", boxShadow: 'none'}}>
    <label className='property'>
    { this.props.measures['edge_more_015_length'].text }
    </label>
    <div className='value'>
    <label>
    { data[latest] ? data[latest]['edge_more_015_length'] : NaN }
    </label>
    </div>
    </Card.Grid>
    </Card>
</Col>
            </Row>,
            <Row gutter={16}>
                {
                    measures.map((measure, index) => (
                      <Col span={12} key={index}>
                        <ResponsiveContainer  width={'100%'} height={250} >
                        <ComposedChart data={this.props.data} className='chart'>
                            <XAxis dataKey="year" name="年" stroke="#646f7a"/>
                            <YAxis dataKey={measure} name={this.props.measures[measure].text} stroke="#646f7a">
                                <Label value={this.props.measures[measure].text}   angle={-90} position='insideLeft' offset={15} fill="#45acd2"/>
                            </YAxis>
                            <Tooltip />
                            <Bar dataKey={measure} barSize={20} fill="#16dde4" name={this.props.measures[measure].text} />
                            <Line type="monotone" dataKey={measure} stroke="#ff7300" name={this.props.measures[measure].text} />
                        </ComposedChart>
                        </ResponsiveContainer>
                    </Col>
                    ))
                }
            </Row>
        ]);
    }
};

const mapStateToProps = state => {
    return {
       data: filterReport(state.currentReportId, state.reports),
       measures: { ...state.measures }, 
       bridges: getBridges(state),
       name: state.currentBridge
    };
}

const filterReport = (uuId, reports) => {
    return reports[uuId] ? [...reports[uuId].data]: [];
};

const getBridges = (state) => {
    return state.reports.map((report, index) => ({
        uuid: index,
        name: report.name
    }))
}



const mapDispatchToProps = dispatch => {
    return {
       loadReport: (uuId) => {
           dispatch({
               type: 'LOAD',
               payload: uuId
           })
       },
       selectBridge: ({ key }) => {

           setTimeout(() => {
                dispatch({
                    type: 'SELECT_END',
                    payload: key
                });
           }, Math.random() * 1000 * 6)
           dispatch({
               type: 'SELECT_START',
               payload: key
           });
       }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Report))
