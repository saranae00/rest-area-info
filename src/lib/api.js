import axios from 'axios';

const EXPRESSWAY_REST_AREA_BASIC_API_KEY = encodeURI('5334093111', 'UTF-8');

export const getRestsTheme = arg => {
  return axios.get(
    `/openapi/restinfo/restThemeList?key=${EXPRESSWAY_REST_AREA_BASIC_API_KEY}&type=json&pageNo=${arg.pageNo}&numOfRows=${arg.numOfRows}`
  );
};
export const getRestsServiceRoute = arg => {
  return axios.get(
    `/openapi/business/serviceAreaRoute?key=${EXPRESSWAY_REST_AREA_BASIC_API_KEY}&type=json&numOfRows=${arg.numOfRows}&pageNo=${arg.pageNo}`
  );
};
export const getRestsService = arg => {
  return axios.get(
    `/openapi/restinfo/restConvList?key=${EXPRESSWAY_REST_AREA_BASIC_API_KEY}&type=json&routeNo=${arg.routeNo}&numOfRows=${arg.numOfRows}&pageNo=${arg.pageNo}`
    //   `/openapi/locationinfo/locationinfoRest?key=${EXPRESSWAY_REST_AREA_BASIC_API_KEY}&type=json&routeNo=${arg.routeNo}&numOfRows=${arg.numOfRows}&pageNo=${arg.pageNo}`
  );
};
export const getExpresswayCode = () => axios.get(`/data/expresswayCode.json`);
// export const getRestsService = arg =>
//   axios.get(
//     `/exopenapi/business/conveniServiceArea?serviceKey=DeQ4YZIS1Q4uUyU7Y7w1UiE6xwfNkeD3uXesjmeBW5E1HbdVinrINpvXy%2B3U8Mv7NZG3qlSRVkeqrXUk%2BOm4HQ%3D%3D&type=json&numOfRows=${arg.numOfRows}&pageNo=${arg.pageNo}`
//     //`http://data.ex.co.kr/openapi/restinfo/restConvList?key=${EXPRESSWAY_REST_AREA_BASIC_API_KEY}&type=json&numOfRows=${arg.numOfRows}&pageNo=${arg.pageNo}`
//   );
