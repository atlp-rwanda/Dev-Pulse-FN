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
      'Professional Communication',
      'Rating',
    ];

    const { engineers } = this.props;
    const { myEngineerslist } = this.props;
    /**
     * Filter all rated engineers to remain with only your Team
     */
    const ratableEngineers = engineers
      .filter((el) => {
        return myEngineerslist.some((f) => {
          return f?.id === el?.user?.id;
        });
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
      });
    // console.log('filterbyCohort', filterbyCohort);
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
}) => ({
  engineers: getRatings.engineers,
  myEngineerslist: engineersReducer.engineers,
  selectedCohort: engineer.selectedCohort,
  selectedProgram: engineer.selectedProgram,
});

export { Table as EngineerTable };
export default connect(mapStateToProps, {
  getRatings: getEngineers,
  getMyEngineers: myEngineers,
})(Table);
