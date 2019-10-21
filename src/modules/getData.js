import { createAction, handleActions } from 'redux-actions';
import { takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequestSaga from '../lib/createRequestSaga';

const GET_EXPRESSWAY_CODE = 'rests/GET_EXPRESSWAY_CODE';
const GET_EXPRESSWAY_CODE_SUCCESS = 'rests/GET_EXPRESSWAY_CODE_SUCCESS';
const GET_RESTS_SERVICE = 'rests/GET_RESTS_SERVICE';
const GET_RESTS_SERVICE_SUCCESS = 'rests/GET_RESTS_SERVICE_SUCCESS';
const GET_RESTS_THEME = 'rests/GET_RESTS_THEME';
const GET_RESTS_THEME_SUCCESS = 'rests/GET_RESTS_THEME_SUCCESS';
const GET_RESTS_SERVICE_ROUTE = 'rests/GET_RESTS_SERVICE_ROUTE';
const GET_RESTS_SERVICE_ROUTE_SUCCESS = 'rests/GET_RESTS_SERVICE_ROUTE_SUCCESS';

export const getExpresswayCode = createAction(GET_EXPRESSWAY_CODE);
export const getRestsService = createAction(GET_RESTS_SERVICE);
export const getRestsTheme = createAction(GET_RESTS_THEME);
export const getRestsServiceRoute = createAction(GET_RESTS_SERVICE_ROUTE);

const getExpresswayCodeSaga = createRequestSaga(
  GET_EXPRESSWAY_CODE,
  api.getExpresswayCode
);
const getRestsServiceSaga = createRequestSaga(
  GET_RESTS_SERVICE,
  api.getRestsService
);
const getRestsThemeSaga = createRequestSaga(GET_RESTS_THEME, api.getRestsTheme);
const getRestsServiceRouteSaga = createRequestSaga(
  GET_RESTS_SERVICE_ROUTE,
  api.getRestsServiceRoute
);

export function* restsSaga() {
  yield takeLatest(GET_EXPRESSWAY_CODE, getExpresswayCodeSaga);
  yield takeLatest(GET_RESTS_SERVICE, getRestsServiceSaga);
  yield takeLatest(GET_RESTS_THEME, getRestsThemeSaga);
  yield takeLatest(GET_RESTS_THEME, getRestsServiceRouteSaga);
}

const initialState = {
  restsService: null,
  expresswayCode: null,
  restsTheme: null,
  serviceRoute: null
};

const getData = handleActions(
  {
    [GET_EXPRESSWAY_CODE_SUCCESS]: (state, actions) => {
      return {
        ...state,
        expresswayCode: actions.payload
      };
    },
    [GET_RESTS_SERVICE_SUCCESS]: (state, actions) => {
      return {
        ...state,
        restsService: actions.payload.data.list
      };
    },
    [GET_RESTS_THEME_SUCCESS]: (state, actions) => {
      return {
        ...state,
        restsTheme: actions.payload.data.list
      };
    },
    [GET_RESTS_SERVICE_ROUTE_SUCCESS]: (state, actions) => {
      return {
        ...state,
        serviceRoute: actions.payload.data.list
      };
    }
  },
  initialState
);

export default getData;
