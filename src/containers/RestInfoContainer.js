import React, { Fragment, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRestsPosition, getRestsService } from '../modules/getData';
import RestInfo from '../components/RestInfo';

const RestInfoContainer = () => {
  const restInfoService = useSelector(state => state.getData);
  console.log(restInfoService);
  console.log('a');

  return <div>{<RestInfo />}</div>;
};

export default React.memo(RestInfoContainer);
