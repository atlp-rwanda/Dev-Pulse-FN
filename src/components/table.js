import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableContent from './tableContent';
import { getEngineers } from '../actions/getEngineers';
import { myEngineers } from '../actions/engineerList';
class Table extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getRatings();
    this.props.getMyEngineers();
  }

  render() {
    const columns = [
      'Name',
      'Quality',
      'Quantity',
      'P. Communication',
      'Manager',
      'Sprints',
      'Rating',
    ];

    const { engineers } = this.props;
    const { myEngineerslist } = this.props;
    const { allRatings } = this.props;
    const profile = this.props.profile || {};
    /**
     * Filter all rated engineers to remain with only your Team
     */
    const ratableEngineers = engineers
      .filter((el) => {
        const profileSuccess = profile.success || {};
        const profileData = profileSuccess.data || {};
        if (profileData.isLead) {
          return true;
        }
        return myEngineerslist.some((f) => {
          return f?.id === el?.user?.id;
        });
      })
      .filter((engineer) => {
        if (
          engineer.quality < this.props.average ||
          engineer.quantity < this.props.average ||
          engineer.communication < this.props.average ||
          this.props.average < 1
        ) {
          return true;
        }

        return false;
      })
      .filter((engineer) => {
        if (
          engineer.user.cohort ===
            this.props.selectedCohort ||
          this.props.selectedCohort === 0
        )
          return true;
        return false;
      })
      .filter((engineer) => {
        if (
          engineer.user.program ===
            this.props.selectedProgram ||
          this.props.selectedProgram === 0
        )
          return true;
        return false;
      })
      .map((engineer) => {
        const sprintIds = [];
        if (allRatings && allRatings.length) {
          allRatings.forEach((rate) => {
            if (!sprintIds.includes(rate.sprintId) && rate.trainee === engineer.trainee) {
              sprintIds.push(rate.sprintId);
            }
          });
        }
        return {
          ...engineer,
          ratedSprints: sprintIds.length,
        };
      });
    const items = [];
    try {
      ratableEngineers.map((engineer) => {
        const engineerRatings = {};
        engineerRatings.id = engineer.user.id;
        (engineerRatings.name = `${engineer.user.firstName} ${engineer.user.lastName}`),
          (engineerRatings.ratings = [
            (engineerRatings.quality = engineer.quality),
            (engineerRatings.quantity = engineer.quantity),
            (engineerRatings.communication =
              engineer.communication),
            (engineerRatings.manager = `${engineer.manager.firstName} ${engineer.manager.lastName}`),
            (engineerRatings.ratedSprints = engineer.ratedSprints),
          ]);
        items.push(engineerRatings);
      });
    } catch (ex) {
      console.log(ex);
    }
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
            <TableContent data={items} />
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({
  getRatings,
  engineersReducer,
  engineer,
  profile,
}) => ({
  engineers: getRatings.engineers,
  allRatings: getRatings.allRatings,
  myEngineerslist: engineersReducer.engineers,
  selectedCohort: engineer.selectedCohort,
  average: engineer.averageRating,
  selectedProgram: engineer.selectedProgram,
  profile,
});

export { Table as EngineerTable };
export default connect(mapStateToProps, {
  getRatings: getEngineers,
  getMyEngineers: myEngineers,
})(Table);
