import React from 'react';

const TableBody = ({ data, openModal }) => {
  console.log("\n\n\n\n\n\n\n\n\n", data);
  return (
    <>
      {data.map((item, i) => (
        <>
          <tr onClick={() => openModal(item.id)} key={i}>
            <td className="name">{item.date}</td>
            <td style={item.quality >= 1 ? { color: 'green' } : { color: 'red' }}>{item.quality}</td>
            <td style={item.quantity >= 1 ? { color: 'green' } : { color: 'red' }}>{item.quantity}</td>
            <td style={item.communication >= 1 ? { color: 'green' } : { color: 'red' }}>{item.communication}</td>
            <td style={item.average >= 1 ? { color: 'green' } : { color: 'red' }}>{item.average}</td>
          </tr>
        </>
      ))}
    </>
  );
};

export default TableBody;
