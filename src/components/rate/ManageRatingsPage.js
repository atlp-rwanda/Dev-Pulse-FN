import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  rateEngineer
} from '../../actions/engineerAction';
import { newRating } from '../../__mocks__/mockData';
import RatingForm from './RateForm';
import {
  getEngineers,
} from '../../actions/getEngineers';
import {
  myEngineers,
} from '../../actions/engineerList';
//import { getMyEngineers } from '../../api/rateApi';

class ManageRatingsPage extends React.Component {
  // getMyEngineers,
  // myEngineers,
  // history,
  // ...props


  constructor(props) {
    super(props);
    this.state = {
      rating: this.props.rating,
      localUsers: [],
      name:null,
    };
  }
  // set come local states e.g. rating before we save it
  // const [rating, setRating] = useState({ ...props.rating });
  
  
  //const [savingRating, setsavingRating] = useState(false);


  componentDidMount(){
    this.props.getEngineers();
  }

  componentDidUpdate(){

  console.log("Ratings", this.state.rating )

    const allEngineers = this.props.allEngineers 
    const myEngineerslist = this.props.myEngineerslist 

    //console.log("Engineers<><><>",allEngineers )

    const engineerId = this.props.rating.trainee;
    let engineer = getEngineerById(allEngineers, engineerId);
    console.log('Engineer here from the existing ratings =====>', engineer)
    //console.log("enginner", engineer)
    if(engineer && false)
      this.state.name = `${engineer.trainee.firstName} ${engineer.trainee.lastName}`;

    else if (!myEngineerslist[0]){ // in case there is no single rating for this engineer
      this.props.getMyEngineers();
    }

    if(myEngineerslist[0] && !this.state.name){ // from my list
      engineer = getEngineerById(myEngineerslist, engineerId);
      console.log("engineer====<><><> from my engineers", engineer)
      this.setState({name:  engineer.name });

    }

   // console.log("myEngineers finally here",myEngineerslist)

  }

  handleChange = event => {
    var rating = {...this.state.rating}

    if (event.target.id === 'rate') {

          rating[event.target.name]={
            rate: parseInt(event.target.value),
            feedback: rating[event.target.name].feedback
          }
    

    }
    else if (event.target.id === 'feedback') {

      rating[event.target.name]={
        feedback: event.target.value,
        rate: rating[event.target.name].rate
      }
    }
    this.setState({rating});


  // this.setState({rating});
  //     this.setState({
  //       ...rating,
  //       [event.target.name]: {
  //         feedback: event.target.value,
  //         rate: ...rating[event.target.name].rate
  //       }
  //     });

  //   }
  };

  handleRateSave = (event)=> {
    const { history } = this.props;

    event.preventDefault();
    // set the local state to savingRating
    //setsavingRating(true);
    // rating is the local state being set locally above
    console.log('rating to save', this.state.rating);

    rateEngineer(this.state.rating);
    //history.push('/')
  }

  
  render(){
    return (
    <RatingForm
      engineer={this.state.name}
      onRate={this.handleRateSave}
      onChange={this.handleChange}
      rating={this.rating}
    />
    )
  }
}

ManageRatingsPage.propTypes = {
  // rating: PropTypes.object.isRequired,
  // // ratings: PropTypes.array.isRequired,
  // myEngineers: PropTypes.array.isRequired,
  // rateEngineer: PropTypes.func.isRequired,
};

const getEngineerById = (engineers, id) => {
  const engineer_ = engineers.find(engineer => (engineer.trainee === id || engineer.id === id));
  console.log("engineers",engineers)
  console.log("choosen engineer",engineer_)


    return engineer_;
}


const mapStateToProps = ({ getRatings, engineersReducer, ratings }, ownProps) => {
  const engId = ownProps.match.params.engId;
  console.log("State for all engineers : rating", getRatings)
  console.log("State for my engineers : rating", engineersReducer)


  return {
    rating: {...newRating, trainee: parseInt(engId, 10)},
    allEngineers: getRatings.engineers,
    myEngineerslist: engineersReducer.engineers,

    ratings
  };
};

const mapDispatchToProps = { rateEngineer, getEngineers: ()=> getEngineers(), getMyEngineers: ()=> myEngineers() };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageRatingsPage);
