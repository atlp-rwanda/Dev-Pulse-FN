import React from 'react';
import { Link } from 'react-router-dom';

const TableBody = ({ data }) => {
  return (
    <>
      {data.map((item, i) => (
        <tr
          key={i}
          className={`${
            item.quality < 1 ||
            item.quantity < 1 ||
            item.communication < 1
              ? 'table-row'
              : 'table'
          } `}
        >
          <td>
            <Link to={`/users/${item.id}`} className="name">
              {item.name}
            </Link>
          </td>
          <td
            style={
              item.quality < 1
                ? { color: 'red' }
                : { color: 'green' }
            }
          >
            {item.quality}
          </td>
          <td
            style={
              item.quantity >= 1
                ? { color: 'green' }
                : { color: 'red' }
            }
          >
            {item.quantity}
          </td>
          <td
            style={
              item.communication >= 1
                ? { color: 'green' }
                : { color: 'red' }
            }
          >
            {item.communication}
          </td>
          <td>
              {item.manager}
          </td>
          <td>
              {item.ratedSprints}
          </td>
          <td>
            <Link to={`/ratings/rate/${item.id}`}>
              <button className="button" type="button">
                {' '}
                Rate{' '}
              </button>
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableBody;
