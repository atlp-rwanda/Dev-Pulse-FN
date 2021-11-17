import React from 'react';
import CsvDownload from 'react-json-to-csv';
import deleteFeedback from '../../../helpers/flattenRatings';

const ExportRatingsModal = ({
  popupClass,
  handleClose,
  from,
  onFromChange,
  to,
  onToChange,
  data,
  fetchData,
  onDownload,
}) => {
  return (
    <div className={`${popupClass} popup-container`}>
      <div className='popup'>
        <button className='close ' onClick={handleClose}>
          X
        </button>
        <div className='flex pt-4'>
          <div>
            <p>Select Start Date</p>
            <input type='date' value={from} onChange={onFromChange} />
          </div>
          <div>
            <p>Select End Date</p>
            <input type='date' value={to} onChange={onToChange} />
          </div>
        </div>
        <div className='export'>
          {data.length ? (
            <div onClick={onDownload}>
              <CsvDownload
                data={data.map(deleteFeedback)}
                filename='cohortRatings.csv'
                className='button'
              >
                Download
              </CsvDownload>
            </div>
          ) : (
            <button className='button' type='button' onClick={fetchData}>
              Retrieve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportRatingsModal;
