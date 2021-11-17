import React from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import { useSelector } from 'react-redux';

const TableBody = ({ data, openModal,isAVerage ,getRatingToUpdate,role}) => {
  const { pendingRatings } = useSelector(state=>state);


  const Icon = ({item,...props}) => {

    const found = pendingRatings.data?.some(rating=>rating.ratingId==item.id);
    if(found){
        return <CachedOutlinedIcon  {...props} />;
    }
    return <CreateOutlinedIcon onClick={() => getRatingToUpdate(item)} {...props}  />
  };


  return (
    <>
      {data.map((item, i) => (
        <>
          <tr  key={i}>
            <td onClick={() => openModal(item.id)} className="name">{item.date}</td>
            <td onClick={() => openModal(item.id)} style={item.quality >= 1 ? { color: 'green' } : { color: 'red' }}>{item.quality}</td>
            <td  onClick={() => openModal(item.id)}style={item.quantity >= 1 ? { color: 'green' } : { color: 'red' }}>{item.quantity}</td>
            <td onClick={() => openModal(item.id)} style={item.communication >= 1 ? { color: 'green' } : { color: 'red' }}>{item.communication}</td>
            <td onClick={() => openModal(item.id)} style={item.average >= 1 ? { color: 'green' } : { color: 'red' }}>{item.average}</td>
             {role!='Trainee' && <td>{!isAVerage && <Icon  item={item} fontSize="medium" />}</td>}
          </tr>
        </>
      ))}
    </>
  );
};

export default TableBody;