import React, { Fragment } from 'react';
import './RestInfo.css';
import { MdHighlightOff } from 'react-icons/md';
// props = {
//   restCode: '',
//   restName: '',
//   restAddr: '',
//   services: [
//     {
//       convName: '',
//       convDesc: '',
//       convStartTime: '',
//       convEndTime: ''
//     }
//   ],
//   theme: {
//     name: '',
//     detail: ''
//   }
// };
const RestInfo = props => {
  const { restInfo, onCloseInfo } = props;
  console.log(restInfo);
  return restInfo ? (
    <div className="restInfo">
      <div>
        <MdHighlightOff onClick={onCloseInfo} />
      </div>
      <div>{restInfo.restName}</div>
      <div>{restInfo.restAddr}</div>
      <div>{restInfo.theme.name}</div>
      <div>{restInfo.theme.detail}</div>
      {restInfo.services.map((item, index) => {
        return (
          <div key={index}>
            <div>{item.convName}</div>
            <div>{item.convDesc}</div>
            <div>{item.convStartTime}</div>
            <div>{item.convEndTime}</div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default RestInfo;
