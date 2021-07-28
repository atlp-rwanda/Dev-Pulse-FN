import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableContent from './tableContent';
import { getEngineers } from '../actions/getEngineers';
import {
  myEngineers,
} from '../actions/engineerList';


class Table extends Component {
  componentDidMount() {
    this.props.getRatings(); 
    this.props.getMyEngineers();
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


    const { engineers } = this.props;
    const { myEngineerslist } = this.props;

    /**
     * Filter all rated engineers to remain with only your Team
     */
    const ratableEngineers = engineers.filter( el => {
      return myEngineerslist.some( f => {
        return f.id === el.user.id
      });
    });

    const items = [];
    try {
      ratableEngineers.map((engineer) => {
       
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

const mapStateToProps = ({ getRatings ,engineersReducer}) => ({

  engineers: getRatings.engineers,
  myEngineerslist: engineersReducer.engineers,

});

export { Table as EngineerTable };
export default connect(mapStateToProps, { getRatings:getEngineers, getMyEngineers: myEngineers   })(Table);
