import { Subject } from 'rx';
import autobind from 'react-autobind';
import makeDiff from 'immutable-diff';

const streamsFromSpec = ({ inputs = [], outputs = [] }) => {
  const makeStreams = xs => xs.reduce((memo, key) => Object.assign(memo, { [key]: new Subject() }), {});

  return {
    inputs: makeStreams(inputs),
    outputs: makeStreams(outputs)
  };
};

class Graph {
  constructor(store) {
    autobind(this);

    this.store = store;
    this.prevGraphState = this.getGraphStoreState();

    this.store.subscribe(this.onStoreChange);

    this.blocks = {};
    this.connections = [];
  }

  getBlockSpec(blockName) {
    return this.store.getState().getIn(['availableBlocks', blockName]);
  }

  getGraphStoreState() {
    return this.store.getState().get('graph');
  }

  onStoreChange() {
    const graphState = this.getGraphStoreState();

    if (!graphState.equals(this.prevGraphState)) {
      const diff = makeDiff(this.prevGraphState, graphState);

      console.log('graphState changed', graphState, diff);

      const ops = {
        add: diff => {
          const pathType = diff.getIn(['path', 0]);

          if (pathType === 'blocks') {
            this.addBlock({
              id: diff.getIn(['path', 1]),
              blockName: diff.getIn(['value', 'block'])
            });
          } else if (pathType === 'connections') {
          }
        }
      };

      diff.forEach(singleDiff => {
        const op = ops[singleDiff.get('op')];

        if (!op) {
          console.warn(`unknown op: ${op}`, diff.toJS());
          return;
        }

        op(singleDiff);
      });

      this.prevGraphState = graphState;
    }
  }

  addBlock({ id, blockName }) {
    console.log('addBlock', id, blockName);

    const blockSpec = this.getBlockSpec(blockName);
    const streams = streamsFromSpec(blockSpec);

    this.blocks[id] = blockSpec;
    this.blocks[id]._streams = streams;
    this.blocks[id].code({ ...streams });

    console.log('blocks', this.blocks);
  }

  addConnection({ id, from, to }) {
    // TODO
    // this.connections.push({ id, from, to });
    // const fromOutput = this.blocks[from.id]._streams.outputs[from.output];
    // const toInput = this.blocks[to.id]._streams.inputs[to.input];
    // fromOutput.asObservable().subscribe(toInput);
  }

  removeBlock() {
    // TODO
  }

  removeConnection() {
    // TODO
  }
}

const createGraph = store => new Graph(store);

export default createGraph;
