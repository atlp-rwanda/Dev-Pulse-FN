import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { approveRating ,rejectRating} from '../../actions/rating';
import { fetchPendingRatings } from '../../actions/EngineerActions';


const UpdatedRatings = (props) => {
  const store = useSelector(state => state);
  const { pendingRatings } = store;
  const [feedback, setFeedback] = React.useState({});
  const [modal, setModal] = React.useState(false);
  const [action, setAction] = React.useState('');
  const [rateId, setRateId] = React.useState('');
  const [columns,setColumns]  = React.useState([
    'Trainee',
    'Quality',
    'Quantity',
    'Professional Communication',
    'Action'
  ]);
  const[refferencedRateId,setRefferencedRateId] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(()=>{
    fetchPendingRatings()(dispatch);
  },[])

  const confirmAction = (rate, action) => {
    setAction(action);
    setModal(true);
    setRateId(rate.id);
    setRefferencedRateId(rate.rating.id);
  }
  const executeAction = async () => {
    setModal(false);
    if (action === 'Approve') {
      await approveRating(rateId,refferencedRateId)(dispatch);
    } else if (action === 'Reject') {
      await rejectRating(rateId)(dispatch);
    }

  }

  const getFeedback = (rating) => {

    setFeedback(rating);
  }




  return (
    <div className='emailsContainer'>
      <div style={{ width: '90%' }}>

        {feedback.id && <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setFeedback({})}

            >
              &times;
            </span>
            <table className="tab">
              <tbody>
                <tr>
                  <td>Quality</td>
                  <td>{feedback.quality.feedback}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{feedback.quantity.feedback}</td>
                </tr>
                <tr>
                  <td>ProfessionalCommunication</td>
                  <td>{feedback.communication.feedback}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}



        <Dialog
          open={modal}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className="confirmDialogModal"
          onClose={() => setModal(false)}
        >
          <DialogTitle id="scroll-dialog-title" className="deleteModalTitle">{action} Rating</DialogTitle>
          <DialogContent dividers>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
            >
              {`Are you sure you want ${action} this update ?`}

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => setModal(false)}>
              Cancel
            </Button>
            <Button color="primary" onClick={executeAction}>
              {action}
            </Button>
          </DialogActions>
        </Dialog>


        <table className='table'>
          <tbody>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
            {
              pendingRatings.data?.map((rating, key) => (
                <tr className='text-blue' key={key}>
                  <td onClick={() => getFeedback(rating)}>{`${rating.rating?.user.firstName} ${rating.rating?.user.lastName}`}</td>
                  <td onClick={() => getFeedback(rating)}><span >{rating.rating?.quality.rate}</span> ➡ <span className='text-red'>{rating.quality?.rate}</span></td>
                  <td onClick={() => getFeedback(rating)}><span >{rating.rating?.quantity.rate}</span> ➡ <span className='text-red'>{rating.quantity?.rate}</span></td>
                  <td onClick={() => getFeedback(rating)}><span >{rating.rating?.communication.rate}</span> ➡ <span className='text-red'>{rating.communication?.rate}</span></td>
                  <td>
                    <button onClick={() => confirmAction(rating, 'Approve')} className='btn'>Approve</button>
                    {" "}
                    <button onClick={() => confirmAction(rating, 'Reject')} className='btn'>Reject</button>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}


export default UpdatedRatings