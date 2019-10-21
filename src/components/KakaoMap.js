import React, { Fragment, useEffect, useRef, useCallback } from 'react';
import './Map.css';
import { useSelector, useDispatch } from 'react-redux';
import { setMarkers } from '../modules/kakaoMap';

const KakaoMap = props => {
  const {
    restsInfoData,
    isExpressCodeLoading,
    isRestsServiceLoading,
    isRestsThemeLoading,
    isServiceRouteLoading,
    onClickMarker,
    setKakaoMap
  } = props;
  const mapRef = useRef(null);
  const { kakao } = window;
  //let map = useSelector(state => state.kakaoMap.is);
  let isMouseDown = false;
  let isDrag = false;

  let arrMarkers = useSelector(state => state.kakaoMap.markers);

  const dispatch = useDispatch();
  const setArrayMarkers = useCallback(
    markers => dispatch(setMarkers(markers)),
    [dispatch]
  );

  // 현재 위치 중심으로 지도 이동
  const setCurrentLocation = map => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        position => {
          map.panTo(
            new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        },
        error => {
          alert('Error: ' + error.message);
        }
      );
    }
  };

  // target node에 이벤트 핸들러를 등록하는 함수
  function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback);
    } else {
      target.attachEvent('on' + type, callback);
    }
  }

  // target node에 등록된 이벤트 핸들러를 제거하는 함수
  function removeEventHandle(target, type, callback) {
    if (target.removeEventListener) {
      target.removeEventListener(type, callback);
    } else {
      target.detachEvent('on' + type, callback);
    }
  }

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseDown = () => {
    isMouseDown = true;
  };

  // 커스텀 오버레이 드래그시 클릭 방지
  const onOverlayMouseMove = () => {
    isMouseDown && (isDrag = true);
  };

  // 마커를 표시하고 커스텀 오버레이에 이벤트 바인딩
  const setMarker = (map, position, restName, restCode) => {
    // 커스텀 오버레이에 표시할 내용
    let content = document.createElement('div');
    content.className = 'label';
    content.innerHTML = restName;

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: position
    });

    // 커스텀 오버레이를 생성
    const customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: position,
      content: content,
      yAnchor: 3
    });

    // 마커 배열에 추가
    arrMarkers.push({ marker: marker, overlay: customOverlay });
    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);

    // 이벤트 핸들러 등록
    kakao.maps.event.addListener(marker, 'click', () => {
      if (!isDrag) {
        onClickMarker(restCode);
      }
    });
    addEventHandle(content, 'mousedown', onOverlayMouseDown);
    addEventHandle(content, 'mousemove', onOverlayMouseMove);
    addEventHandle(content, 'mouseup', () => {
      isMouseDown = false;
      if (!isDrag) {
        onClickMarker(restCode);
      }
      isDrag = false;
    });
  };
  let map;
  useEffect(() => {
    const el = mapRef.current;
    if (
      el !== null &&
      isExpressCodeLoading === false &&
      isRestsServiceLoading === false
    ) {
      map = new kakao.maps.Map(el, {
        center: new kakao.maps.LatLng(37.592128000000002, 126.97942),
        level: 12
      });
      setKakaoMap(map);

      setCurrentLocation(map);
    }

    console.log(restsInfoData);
    if (restsInfoData) {
      let geocoder = new kakao.maps.services.Geocoder();
      arrMarkers = [];
      for (let i = 0; i < restsInfoData.length; i++) {
        geocoder.addressSearch(restsInfoData[i].restAddr, function(
          result,
          status
        ) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            setMarker(
              map,
              coords,
              restsInfoData[i].restName,
              restsInfoData[i].restCode
            );
          }
        });
      }
    }
  }, [
    restsInfoData,
    kakao.maps.LatLng,
    kakao.maps.Map,
    setMarker,
    setCurrentLocation,
    isExpressCodeLoading,
    isRestsServiceLoading,
    kakao.maps.services.Geocoder,
    kakao.maps.services.Status.OK
  ]);
  setArrayMarkers(arrMarkers);
  useEffect(() => {
    return () => {
      for (let i = 0; i < arrMarkers.length; i++) {
        arrMarkers[i].marker.setMap(null);
        arrMarkers[i].overlay.setMap(null);
      }
    };
  });
  return (
    <Fragment>
      <div ref={mapRef} className="map"></div>
      {(isExpressCodeLoading || isRestsServiceLoading) && (
        <div className="loading_overlay">
          {isExpressCodeLoading && (
            <Fragment>
              고속도로 코드 데이터
              <br />
            </Fragment>
          )}
          {isRestsServiceLoading && (
            <Fragment>
              휴게소 편의 시설 데이터
              <br />
            </Fragment>
          )}
          {isRestsThemeLoading && (
            <Fragment>
              휴게소 테마 데이터
              <br />
            </Fragment>
          )}
          {isServiceRouteLoading && (
            <Fragment>
              도로별 휴게시설 데이터
              <br />
            </Fragment>
          )}
          {` `}
          로딩중...
        </div>
      )}
    </Fragment>
  );
};

export default KakaoMap;
