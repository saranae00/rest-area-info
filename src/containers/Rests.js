import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getExpresswayCode,
  getRestsService,
  getRestsTheme,
  getRestsServiceRoute
} from '../modules/getData';
import {
  changeExpressway,
  clickRest,
  closeInfo,
  setRestsInfoData
} from '../modules/restsData';
import KaKaoMap from '../components/KakaoMap';
import { setKakaoMapID } from '../modules/kakaoMap';
import RestInfo from '../components/RestInfo';

const Rests = () => {
  // 리덕스 연동 시작
  /****************************************************
   * restsConvData : 휴게소 위치 정보
   * expressCodeData : 고속도로 코드
   * currentExpresswayCode : 현재 선택된 고속도로 코드
   * restsServiceData : 휴게소 편의 시설 정보
   * selectedRestCode : 현재 선택된 휴게소 코드
   ***************************************************/
  const restsTheme = useSelector(state => state.getData.restsTheme);
  const restsConvData = useSelector(state => state.getData.restsService);
  const expressCodeData = useSelector(state => state.getData.expresswayCode);
  const restsRouteData = useSelector(state => state.getData.serviceRoute);
  const currentExpresswayCode = useSelector(
    state => state.restsData.selectedRouteNo
  );
  const selectedRestCode = useSelector(state => state.restsData.selectedRest);
  const restsInfoData = useSelector(state => state.restsData.restsInfo);

  const isRestsThemeLoading = useSelector(
    state => state.loading['rests/GET_RESTS_THEME']
  );
  const isExpressCodeLoading = useSelector(
    state => state.loading['rests/GET_EXPRESSWAY_CODE']
  );
  const isRestsServiceLoading = useSelector(
    state => state.loading['rests/GET_RESTS_SERVICE']
  );
  const isServiceRouteLoading = useSelector(
    state => state.loading['rests/GET_RESTS_SERVICE_ROUTE']
  );
  const showRestInfo = useSelector(state => state.restsData.showInfo);

  const dispatch = useDispatch();
  const onChangeExpressway = useCallback(
    event => dispatch(changeExpressway(event)),
    [dispatch]
  );
  const onClickMarker = useCallback(restCode => dispatch(clickRest(restCode)), [
    dispatch
  ]);

  const getExpresswayCodeFromFile = useCallback(
    () => dispatch(getExpresswayCode()),
    [dispatch]
  );
  const getRestsServiceFromAPI = useCallback(
    restCode => dispatch(getRestsService(restCode)),
    [dispatch]
  );
  const getRestsThemeFromAPI = useCallback(
    restTheme => dispatch(getRestsTheme(restTheme)),
    [dispatch]
  );
  const getRestsServiceRouteFromAPI = useCallback(
    route => dispatch(getRestsServiceRoute(route)),
    [dispatch]
  );
  const setKakaoMap = useCallback(mapId => dispatch(setKakaoMapID(mapId)), [
    dispatch
  ]);
  const onCloseInfo = useCallback(() => dispatch(closeInfo()), [dispatch]);
  const setRestInfo = useCallback(data => dispatch(setRestsInfoData(data)), [
    dispatch
  ]);

  // 리덕스 연동 끝

  const ref = useRef(null);

  // 데이터 구조화
  // 휴게소 코드기 중복되는 데이터 삭제 및 휴게소 정보 추출
  let setRestsInfoDataStruct = () => {
    let result = [];
    // 중복 데이터 제거
    console.log(restsConvData);
    let uniqueRestsConvData = restsConvData.reduce((accumulator, current) => {
      if (checkIfAlreadyExist(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some(item => {
          return (
            item.stdRestCd === currentVal.stdRestCd &&
            item.psCode === currentVal.psCode
          );
        });
      }
    }, []);
    // 중복 데이터 제거
    let uniqueRestsTheme = restsTheme.reduce((accumulator, current) => {
      if (checkIfAlreadyExist(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some(item => {
          return item.stdRestCd === currentVal.stdRestCd;
        });
      }
    }, []);

    for (let i = 0; i < uniqueRestsTheme.length; i++) {
      result.push({
        routeCode: '',
        restCode: uniqueRestsTheme[i].stdRestCd,
        restName: uniqueRestsTheme[i].stdRestNm,
        restAddr: uniqueRestsTheme[i].svarAddr,
        services: [],
        theme: {
          name: uniqueRestsTheme[i].itemNm,
          detail: uniqueRestsTheme[i].detail
        }
      });
    }

    for (let i = 0; i < uniqueRestsConvData.length; i++) {
      let restItem = result.find(
        item =>
          item.restCode === uniqueRestsConvData[i].stdRestCd &&
          uniqueRestsConvData[i].stdRestNm !== null
      );
      if (restItem) {
        restItem.services.push({
          convName: uniqueRestsConvData[i].psName,
          convDesc: uniqueRestsConvData[i].psDesc,
          convStartTime: uniqueRestsConvData[i].stime,
          convEndTime: uniqueRestsConvData[i].etime
        });
      }
    }

    for (let i = 0; i < result.length; i++) {
      let restItem = restsRouteData.find(
        item =>
          item.serviceAreaCode !== null &&
          item.serviceAreaCode.replace('A', '0') === result[i].restCode
      );
      if (restItem) {
        result[i].routeCode = restItem.routeCode;
      }
    }
    console.log(result);
    setRestInfo(result);
  };

  // 고속도로 노선 선택
  const onChangeSelect = e => {
    onChangeExpressway(e);
  };

  // 고속도로 코드 로드
  useEffect(() => {
    try {
      getExpresswayCodeFromFile();
    } catch (e) {
      console.log(e);
    }
  }, [getExpresswayCodeFromFile]);

  // 휴게소 편의시설 정보 로드
  useEffect(() => {
    try {
      getRestsServiceFromAPI({
        routeNo: '',
        numOfRows: '300',
        pageNo: ''
      });
    } catch (e) {
      console.log(e);
    }
  }, [getRestsServiceFromAPI]);

  // 휴게소 도로별 시설 정보 로드
  useEffect(() => {
    try {
      getRestsServiceRouteFromAPI({
        routeNo: '',
        numOfRows: '300',
        pageNo: ''
      });
    } catch (e) {
      console.log(e);
    }
  }, [getRestsServiceRouteFromAPI]);

  // 휴게소 테마 정보 로드
  useEffect(() => {
    try {
      getRestsThemeFromAPI({
        numOfRows: '300',
        pageNo: ''
      });
    } catch (e) {
      console.log(e);
    }
  }, [getRestsThemeFromAPI]);

  const filterdRestsInfo = routeCode => {
    if (routeCode === '') {
      return restsInfoData;
    }
    console.log(restsInfoData);
    return restsInfoData.filter(item => item.routeCode === routeCode);
  };
  // 노선 선택시 데이터 필터링

  const filterdRestsInfoData = filterdRestsInfo(currentExpresswayCode);
  useEffect(() => {});

  if (
    isExpressCodeLoading === false &&
    isRestsServiceLoading === false &&
    isRestsThemeLoading === false &&
    isServiceRouteLoading === false &&
    restsInfoData.length < 1
  ) {
    setRestsInfoDataStruct();
  }

  console.log(filterdRestsInfoData);

  return (
    <Fragment>
      <div className="expressway_select_wrapper">
        <select className="expressway_select" onChange={onChangeSelect}>
          <option value="">전체</option>
          {expressCodeData &&
            expressCodeData.map(item => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="kakaoMap">
        <KaKaoMap
          restsInfoData={filterdRestsInfoData}
          expresswayCodeData={expressCodeData}
          isExpressCodeLoading={isExpressCodeLoading}
          isRestsServiceLoading={isRestsServiceLoading}
          isRestsThemeLoading={isRestsThemeLoading}
          isServiceRouteLoading={isServiceRouteLoading}
          onClickMarker={onClickMarker}
          setKakaoMap={setKakaoMap}
        />
      </div>
      {restsInfoData && showRestInfo && (
        <RestInfo
          restInfo={filterdRestsInfoData.find(
            item => item.restCode === selectedRestCode
          )}
          onCloseInfo={onCloseInfo}
        ></RestInfo>
      )}
    </Fragment>
  );
};

export default React.memo(Rests);
