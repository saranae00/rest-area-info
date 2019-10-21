import { createAction, handleActions } from 'redux-actions';

const SET_MAP_ID = 'kakaoMap/SET_MAP_ID';
const SET_MARKERS = 'kakaoMap/SET_MARKERS';

export const setKakaoMapID = createAction(SET_MAP_ID);
export const setMarkers = createAction(SET_MARKERS);

const initialState = {
  is: null,
  markers: []
};

const kakaoMap = handleActions(
  {
    [SET_MAP_ID]: (state, action) => ({
      ...state,
      is: action.payload
    }),
    [SET_MARKERS]: (state, action) => ({
      ...state,
      markers: action.payload
    })
  },
  initialState
);

export default kakaoMap;
