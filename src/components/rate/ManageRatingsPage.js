import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { rateEngineer } from '../../actions/engineerAction';
import { newRating } from '../../__mocks__/mockData';
import RatingForm from './RateForm';
import { getEngineers } from '../../actions/getEngineers';
import { myEngineers } from '../../actions/engineerList';
import { toast } from 'react-toastify';
import RateAll from './RateAll';
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
    };
  }
  // set come local states e.g. rating before we save it
  // const [rating, setRating] = useState({ ...props.rating });

  //const [savingRating, setsavingRating] = useState(false);

  componentDidMount() {
    this.props.getEngineers();
  }

  componentDidUpdate() {
    console.log('Ratings', this.state.rating);

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
    console.log(this.state, '$444444444');

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

  handleRateSave = async (event) => {
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
    await new Promise(async () => {
      await rateEngineer(this.state.rating);
      this.setState({ loading: false });
      setTimeout(() => {
        history.push(`/users/${this.state.rating.trainee}`);
      }, 1000);
    });
  };

  render() {
    const { ratingMode } = this.props;

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
  { getRatings, engineersReducer, ratings },
  ownProps,
) => {
  const engId = ownProps.match.params.engId;

  return {
    rating: { ...newRating, trainee: parseInt(engId, 10) },
    myEngineerslist: engineersReducer.engineers,
    ratings,
    ratingMode:engId
  };
};
const mapDispatchToProps = {
  rateEngineer,
  getEngineers: () => getEngineers(),
  getMyEngineers: () => myEngineers(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageRatingsPage);