import React from 'react';
import { connect } from 'react-redux';

import { GRID_SIZE } from '../constants';

const OFFSET_X = 12;

const Connections = ({ connections, grid }) => (
  <svg width={grid.width * GRID_SIZE} height={grid.height * GRID_SIZE} className="connections">
    {connections.map(({ id, fromPosition, toPosition }) => {
      const x1 = (fromPosition.x - grid.offsetX) * GRID_SIZE - OFFSET_X;
      const y1 = (fromPosition.y - grid.offsetY) * GRID_SIZE - GRID_SIZE / 2;
      const x2 = (toPosition.x - grid.offsetX) * GRID_SIZE + OFFSET_X;
      const y2 = (toPosition.y - grid.offsetY) * GRID_SIZE + GRID_SIZE / 2;
      const mod = Math.max(50, Math.abs(x2 - x1) / 2 + 50);

      const path = `M ${x1},${y1} C ${x1 + mod},${y1} ${x2 - mod},${y2} ${x2},${y2}`;

      return (
        <g key={id}>
          <path className="connection" d={path} />
          <circle className="connector-circle--connected" cx={x1} cy={y1} r={2} />
          <circle className="connector-circle--connected" cx={x2} cy={y2} r={2} />
        </g>
      );
    })}
  </svg>
);

const mapStateToProps = state => ({
  grid: state.getIn(['ui', 'grid']).toJS(),
  connections: state
    .getIn(['graph', 'connections'])
    .map(connection => {
      const fromBlock = state.getIn(['graph', 'blocks', connection.get('fromId')]);
      const toBlock = state.getIn(['graph', 'blocks', connection.get('toId')]);

      const fromSpec = state.getIn(['blockSpecs', fromBlock.get('name')]);
      const toSpec = state.getIn(['blockSpecs', toBlock.get('name')]);

      const fromPosition = {
        x: fromBlock.getIn(['position', 'x']) + fromBlock.getIn(['size', 'width']),
        y:
          fromBlock.getIn(['position', 'y']) +
          fromBlock.getIn(['size', 'height']) +
          fromSpec.get('outputs').indexOf(connection.get('fromOutput')) +
          1
      };

      const toPosition = {
        x: toBlock.getIn(['position', 'x']),
        y:
          toBlock.getIn(['position', 'y']) -
          toSpec.get('inputs').count() +
          toSpec.get('inputs').indexOf(connection.get('toInput'))
      };

      return { id: connection.get('id'), fromPosition, toPosition };
    })
    .valueSeq()
    .toJS()
});

export default connect(mapStateToProps)(Connections);
