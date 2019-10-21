import { createAction, handleActions } from 'redux-actions';

const SET_RESTS_INFO_DATA = 'rests/SET_REST_INFO_DATA';
const CHANGE_EXPRESSWAY = 'rests/CHANGE_EXPRESSWAY';
const CLICK_REST = 'rests/CLICK_REST';
const CLOSE_INFO = 'rests/CLOSE_INFO';

export const changeExpressway = createAction(CHANGE_EXPRESSWAY, code => code);
export const clickRest = createAction(CLICK_REST, code => code);
export const closeInfo = createAction(CLOSE_INFO);
export const setRestsInfoData = createAction(SET_RESTS_INFO_DATA);

const initialState = {
  restsInfo: [],
  selectedRouteNo: '',
  selectedRest: '',
  showInfo: false
};

const restsData = handleActions(
  {
    [SET_RESTS_INFO_DATA]: (state, action) => {
      return {
        ...state,
        restsInfo: action.payload
      };
    },
    [CHANGE_EXPRESSWAY]: (state, action) => {
      return {
        ...state,
        selectedRouteNo: action.payload.target.value
      };
    },
    [CLICK_REST]: (state, action) => {
      return {
        ...state,
        selectedRest: action.payload,
        showInfo: true
      };
    },
    [CLOSE_INFO]: (state, action) => {
      return {
        ...state,
        showInfo: false
      };
    }
  },
  initialState
);

export default restsData;
