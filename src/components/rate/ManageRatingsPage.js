import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rateEngineer,updateRating } from '../../actions/engineerAction';
import { newRating } from '../../__mocks__/mockData';
import RatingForm from './RateForm';
import { getEngineers } from '../../actions/getEngineers';
import { myEngineers } from '../../actions/engineerList';
import { toast } from 'react-toastify';
import RateAll from './RateAll';
import { fetchEngineer, fetchSprints } from '../../actions/EngineerActions';
import {withRouter} from 'react-router-dom';
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
      name: null,
      loading: false,
      draft:{}
    };
  }
  // set come local states e.g. rating before we save it
  // const [rating, setRating] = useState({ ...props.rating });

  //const [savingRating, setsavingRating] = useState(false);

  componentDidMount() {
    console.log("eeenginer", this.props.rating.trainee);
    if(this.props?.rating?.trainee){
      this.props.fetchEngineer(this.props.rating.trainee);
    }
    console.log("sprints", this.props);
    this.props.getEngineers();
    !this.props.sprints.length && this.props.fetchSprints();

    console.log("sprints component did mount", this.props);


  }

  componentDidUpdate() {
    console.log('\n\n\n\n\n heyyyyyyyy \n\n\n\n\n', this.props);

    // const allEngineers = this.props.allEngineers;
    const myEngineerslist = this.props.myEngineerslist;

    //console.log("Engineers<><><>",allEngineers )

    const engineerId = this.props.rating.trainee;

    var engineer;
    // let engineer = getEngineerById(allEngineers, engineerId);
    //console.log("Engineer here from the existing ratings =====>", engineer);
    //console.log("enginner", engineer)
    // if (engineer && false)
    // this.state.name = `${engineer.trainee.firstName} ${engineer.trainee.lastName}`;
    if (!myEngineerslist[0]) {
      // in case there is no single rating for this engineer
      this.props.getMyEngineers();
    }

    if (myEngineerslist[0] && !this.state.name) {
      // from my list
      //console.log("list of eng", myEngineerslist[0]);
      engineer = getEngineerById(myEngineerslist, engineerId);
      console.log('engineer====<><><> from my engineers', engineer);
      if (engineer) {
        this.setState({ name: engineer.name });
      }
    }

    // console.log("myEngineers finally here",myEngineerslist)
  }

  handleChange = (event) => {
    var rating = { ...this.state.rating };

    if (event.target.id === 'rate') {
      rating[event.target.name] = {
        rate: parseInt(event.target.value),
        feedback: rating[event.target.name].feedback,
      };

    } else if (event.target.id === 'feedback') {
      rating[event.target.name] = {
        feedback: event.target.value,
        rate: rating[event.target.name].rate,
      };
    }
    console.log(this.state, 'this is rating $444444444');
    this.setState({ rating });

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

  handleRateSave = async (event, sprint) => {
    this.setState({ loading: true });
    const { history } = this.props;
    const rateSpec = ['quality', 'quantity', 'communication'];

    for (const spec of rateSpec) {
      if (
        !this.state.rating[spec].feedback ||
        this.state.rating[spec].rate === null
      ) {
        setTimeout(() => {
          this.setState({ loading: false });
          toast.warn(`Please complete ${spec}`);
        }, 2000);

        return;
      }
    }
    event.preventDefault();
    // set the local state to savingRating
    //setsavingRating(true);
    // rating is the local state being set locally above
    // console.log('rating to save', engineersReducer);
    console.log('sprint to send', sprint);
    await new Promise(async () => {
      if(this.props.edit){
      await this.props.updateRating(this.state.rating, this.props.ratingId);
      }else{
      await rateEngineer(this.state.rating, sprint);
      }
      this.setState({ loading: false });
      setTimeout(() => {
        history.push(`/users/${this.state.rating.trainee}`);
      }, 1000);
    });
  };

  render() {
    const { ratingMode, engineer, sprints } = this.props;
    console.log('retrievedEng', this.props.engineer, this.props.sprints);

    return (
      <>
      {ratingMode==='all' ? (<RateAll />) :
      <>
      {this.state.name && (
          <RatingForm
            loading_={this.state.loading}
            engineer={this.state.name}
            onRate={this.handleRateSave}
            onChange={this.handleChange}
            rating={this.rating}
            more={{engDetails:engineer , sprints: [...sprints]}}
            traineeRatings={this.props.traineeRatings}
            edit={this.props.edit}
          />
        )}
      </>}
      </>
    );
  }
}

ManageRatingsPage.propTypes = {
  // rating: PropTypes.object.isRequired,
  // // ratings: PropTypes.array.isRequired,
  // myEngineers: PropTypes.array.isRequired,
  // rateEngineer: PropTypes.func.isRequired,
};

const getEngineerById = (engineers, id) => {
  const engineer_ = engineers.find(
    (engineer) => engineer.trainee === id || engineer.id === id,
  );
  //console.log("engineers", engineers);
  //console.log("choosen engineer", engineer_);

  return engineer_;
};

const mapStateToProps = (
  { getRatings, engineersReducer, ratings, engineer },
  ownProps,
) => {
  console.log('ratings', ownProps);
  const engId = ownProps?.match?.params.engId;

  return {
    rating: { ...newRating, trainee: parseInt(engId, 10) },
    myEngineerslist: engineersReducer.engineers,
    ratings,
    ratingMode:engId,
    engineer: engineer.user,
    sprints: engineer.sprints,
    traineeRatings: engineer.ratings,
  };
};
const mapDispatchToProps = {
  rateEngineer,
  getEngineers: () => getEngineers(),
  getMyEngineers: () => myEngineers(),
  fetchEngineer,
  fetchSprints,
  updateRating
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageRatingsPage));