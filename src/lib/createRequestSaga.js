import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';
import produce from 'immer';
import styled from 'styled-components';

export default function getApiDataSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  if (type === 'rests/GET_EXPRESSWAY_CODE') {
    return function*(action) {
      yield put(startLoading(type));

      try {
        const result = yield call(request, action.payload);
        yield put({
          type: SUCCESS,
          payload: result.data
        });
      } catch (e) {
        yield put({
          type: FAILURE,
          payload: e,
          error: true
        });
      }
      yield put(finishLoading(type));
    };
  }

  if (type === 'rests/GET_RESTS_SERVICE') {
    return function*(action) {
      yield put(startLoading(type));
      try {
        let result = yield call(request, action.payload);
        let preResult = {
          count: 0,
          list: [],
          pageNo: 0,
          numOfRows: 0,
          pageSize: 0,
          message: '',
          code: ''
        };
        preResult.list = preResult.list.concat(result.data.list);

        while (result.data.pageSize > result.data.pageNo) {
          const page = result.data.pageNo + 1;

          result = yield call(request, {
            ...action.payload,
            pageNo: page
          });
          preResult.list = preResult.list.concat(result.data.list);
        }

        yield put({
          type: SUCCESS,
          payload: produce(result, draft => {
            draft.data.list = preResult.list;
          })
        });
      } catch (e) {
        yield put({
          type: FAILURE,
          payload: e,
          error: true
        });
      }
      yield put(finishLoading(type));
    };
  }
  return function*(action) {
    console.log(type);
    yield put(startLoading(type));
    try {
      let result = yield call(request, action.payload);
      let preResult = {
        count: 0,
        list: [],
        pageNo: 0,
        numOfRows: 0,
        pageSize: 0,
        message: '',
        code: ''
      };
      preResult.list = preResult.list.concat(result.data.list);

      while (result.data.pageSize > result.data.pageNo) {
        const page = result.data.pageNo + 1;

        result = yield call(request, {
          ...action.payload,
          pageNo: page
        });
        preResult.list = preResult.list.concat(result.data.list);
      }

      yield put({
        type: SUCCESS,
        payload: produce(result, draft => {
          draft.data.list = preResult.list;
        })
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type));
  };
}
