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

export default function reducer(state = { currentReportId: -1, measures, reports: initialState }, action) {
    switch (action.type) {
        case 'LOAD':
            return { ...state, currentReportId: action.payload };
        default:
            return state;
    }
}