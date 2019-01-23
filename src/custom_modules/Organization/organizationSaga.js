//Effects
import { all, call, put, takeLatest } from 'redux-saga/effects';

//Service
import { request } from 'modules/api';
import { dashboard } from './dashboardApi';

//Constants
import {
    GET_ORGANIZATION_LIST,
    GET_ORGANIZATION_LIST_SUCCESS,
    GET_ORGANIZATION_LIST_FAIL
}
    from '../../modules/constants';

//Handle login request
export function* organizations({ payload }) {
    console.log("demo", payload)
    try {
        const response = yield call(dashboard('url'));
        const response = { status: true }
        yield put({
            type: GET_ORGANIZATION_LIST_SUCCESS,
            payload: { data: response },
        });
    }
    catch (err) {
        yield put({
            type: GET_ORGANIZATION_LIST_FAIL,
            payload: err,
        });
    }
}


export default function* root() {
    yield all([
        takeLatest(GET_ORGANIZATION_LIST, organizations),
    ]);
}
