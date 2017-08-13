import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import autobind from 'react-autobind';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import { withContentRect } from 'react-measure';
import DOM from 'react-dom-factories';

import createGraph from './services/graph';
import reducer from './reducers';
import { GRID_SIZE } from './constants';
import { moveCursor } from './actions';

import Board from './components/board';
import CreateBlock from './components/create-block';
import NewBlock from './components/new-block';
import Overlay from './components/overlay';

import './index.css';

// for blocks ad-hoc UIs
window.DOM = DOM;

const store = createStore(reducer);
const graph = createGraph(store);

class App extends Component {
  constructor() {
    super();
    autobind(this);

    this.state = {
      newBlock: false
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  onKeydown(e) {
    const { key, target } = e;

    if (target.localName !== 'body') {
      return;
    }

    const keyFns = {
      h: () => this.props.moveCursor(-1, 0),
      j: () => this.props.moveCursor(0, 1),
      k: () => this.props.moveCursor(0, -1),
      l: () => this.props.moveCursor(1, 0),
      n: () => this.setState({ newBlock: true })
    };

    if (keyFns[key]) {
      keyFns[key]();
    }
  }

  renderOverlays() {
    const { overlays } = this.props;

    return (
      <div>
        {overlays.createBlock &&
          <Overlay>
            <CreateBlock block={overlays.createBlock} />
          </Overlay>}
      </div>
    );
  }

  render() {
    const { newBlock } = this.state;
    const { cursor, contentRect, measureRef } = this.props;
    const { width, height } = contentRect.bounds;

    const gridWidthCount = Math.floor(width / GRID_SIZE) - 1;
    const gridHeightCount = Math.floor(height / GRID_SIZE) - 1;
    const gridWidth = gridWidthCount * GRID_SIZE;
    const gridHeight = gridHeightCount * GRID_SIZE;
    const gridMarginWidth = Math.floor((width - gridWidth) / 2 + GRID_SIZE / 2);
    const gridMarginHeight = Math.floor((height - gridHeight) / 2 + GRID_SIZE / 2);

    const shouldRender = width > 0 && height > 0;

    const x = cursor.x * GRID_SIZE + gridMarginWidth;
    const y = cursor.y * GRID_SIZE + gridMarginHeight;

    return (
      <div className="app" ref={measureRef}>
        <div style={{ paddingLeft: gridMarginWidth, paddingTop: gridMarginHeight }}>
          {shouldRender && <Board gridWidthCount={gridWidthCount} gridHeightCount={gridHeightCount} cursor={cursor} />}
          {newBlock && <NewBlock x={x} y={y} />}
        </div>

        {this.renderOverlays()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cursor: state.get('cursor').toJS(),
  overlays: state.get('overlays').toJS()
});

const AppMeasured = withContentRect('bounds')(App);
const AppConnected = connect(mapStateToProps, { moveCursor })(AppMeasured);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root')
);
