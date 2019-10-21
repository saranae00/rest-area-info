import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import loading from './loading';
import getData, { restsSaga } from './getData';
import restsData from './restsData';
import kakaoMap from './kakaoMap';

const rootReducer = combineReducers({
  loading,
  getData,
  restsData,
  kakaoMap
});

export function* rootSaga() {
  yield all([restsSaga()]);
}

export default rootReducer;
