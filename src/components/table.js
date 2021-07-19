import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableContent from './tableContent';
import { getEngineers } from '../actions/getEngineers';

class Table extends Component {
  componentDidMount() {
    this.props.getEngineers();
  }

  render() {
    console.log("engineers", this.props.engineers)
    const columns = [
      'Name',
      'Quality',
      'Quantity',
      'Integration',
      'Initiative',
      'Communication',
      'Proffesionalism',
      'Rating',
    ];
    const items = [];

    const { engineers } = this.props.engineers;

    try {
      engineers.map((engineer) => {
        console.log("enginerrrrrrr++++++++++", engineer.user)
        const engineerRatings = {};
        engineerRatings.id = engineer.user.id
        engineerRatings.name = `${engineer.user.firstName} ${engineer.user.lastName}`,
        engineerRatings.ratings = [
          engineerRatings.quality = engineer.quality,
          engineerRatings.quantity = engineer.quantity,
          engineerRatings.initiative = engineer.initiative,
          engineerRatings.professionalism = engineer.professionalism,
          engineerRatings.communication = engineer.communication,
          engineerRatings.integration = engineer.integration,
        ];
        console.log("engineerRatings "  ,engineerRatings)

        items.push(engineerRatings);
      },);
    } catch (ex) {
      console.log(ex);
    }

    return (
      <div>
        
        <table className="table">
          <tbody>
            <tr>
              {columns.map((column) => <th key={column}>{column}</th>)}
            </tr>
            <TableContent data={items} />
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ getRatings }) => ({
  engineers: getRatings,
});

export { Table as EngineerTable };
export default connect(mapStateToProps, { getEngineers })(Table);
