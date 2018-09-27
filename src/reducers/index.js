import initialState from '../data.json';

const measures = {
    edge_count: {
        name: 'edge_count',
        text: '裂缝总数',
        unit: '条'
    }, edge_length: {
        name: 'edge_length',
        text: '裂缝总长度',
        unit: 'm'
    }, edge_less_015_count: {
        name: 'edge_less_015_count',
        text: '小于0.15mm裂缝数量',
        unit: '条'
    }, edge_less_015_length: {
        name: 'edge_less_015_length',
        text: '小于0.15mm裂缝长度',
        unit: 'm'
    }, edge_more_015_count: {
        name: 'edge_more_015_count',
        text: '大于0.15mm裂缝数量',
        unit: '条'
    }, edge_more_015_length: {
        name: 'edge_more_015_length',
        text: '大于0.15mm裂缝长度',
        unit: 'm'
    }
};

export default function reducer(state = { currentReportId: -1, currentBridge: '显示桥梁名称', measures, reports: initialState, loading: false }, action) {
    switch (action.type) {
        case 'SELECT_START': 
            return {...state, loading: true};
        case 'LOAD':
        case 'SELECT_END':
            const uuid = isNaN(action.payload) ? -1: action.payload;
            const currentBridge = uuid === -1 ?  '显示桥梁名称': state.reports[action.payload].name ;
            return { ...state, currentReportId: action.payload, currentBridge, loading: false };
        default:
            return state;
    }
}