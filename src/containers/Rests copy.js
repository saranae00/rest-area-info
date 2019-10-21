import React, { Fragment, useCallback } from 'react';
import { getRestsPosition, getExpresswayCode } from '../modules/getData';
import { connect, useDispatch } from 'react-redux';

import { changeExpressway, clickRest } from '../modules/restsData';
import KaKaoMap from '../components/KakaoMap';

const { useEffect } = React;
const Rests = ({
  getRestsPosition,
  getExpresswayCode,
  restsPosData,
  expressCodeData,
  currentExpresswayCode,
  isRestsPosDataLoading,
  isExpressCodeLoading
}) => {
  //   restsPosData = useSelector(state => state.getData.rests);
  //   expressCodeData = useSelector(state => state.getData.expresswayCode);
  //   isRestsPosDataLoading = useSelector(
  //     state => state.loading['rests/GET_RESTSPOSITION']
  //   );
  //   isExpressCodeLoading = useSelector(
  //     state => state.loading['rests/GET_EXPRESSWAYCODE']
  //   );

  const dispatch = useDispatch();
  const onChangeExpressway = useCallback(
    event => dispatch(changeExpressway(event)),
    [dispatch]
  );
  const onClickMarker = useCallback(restCode => dispatch(clickRest(restCode)), [
    dispatch
  ]);

  const onChangeSelect = e => {
    onChangeExpressway(e);
  };

  useEffect(() => {
    getExpresswayCode();
  }, [getExpresswayCode]);

  useEffect(() => {
    getRestsPosition({
      routeNo: currentExpresswayCode,
      numOfRows: '300',
      pageNo: ''
    });
  }, [getRestsPosition, currentExpresswayCode]);

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
          restsPosData={restsPosData}
          expresswayCodeData={expressCodeData}
          isRestsPosDataLoading={isRestsPosDataLoading}
          isExpressCodeLoading={isExpressCodeLoading}
          onClickMarker={onClickMarker}
        />
      </div>
    </Fragment>
  );
};

export default connect(
  ({ loading, getData, restsData }) => ({
    restsPosData: getData.rests,
    expressCodeData: getData.expresswayCode,
    currentExpresswayCode: restsData.selectedRouteNo,
    isRestsPosDataLoading: loading['rests/GET_RESTSPOSITION'],
    isExpressCodeLoading: loading['rests/GET_EXPRESSWAYCODE']
  }),
  {
    getRestsPosition,
    getExpresswayCode
  }
)(Rests);
