import React, { Component } from 'react';
import { isEqual } from 'lodash';
import {
  Display,
  RedPixel,
  BlackPixel,
  GreenPixel,
} from './Presentational.js';
import {
  moveSnake,
  moveSnakeAndLengthen,
  chooseNewDirection,
  newAppleLoc,
} from './utilities.js';

const FRAMES_PER_SECOND = 30;

const defaultConsts = {
  FRAME_LENGTH: 1000 / FRAMES_PER_SECOND,
  DISPLAY_WIDTH: 40,
  DISPLAY_HEIGHT: 50,
};

function defaultState(displayWidth, displayheight) {
  // TODO: Snake starts at random location
  const snakeLocs = [
    { x: 4, y: 1 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ];

  const appleLoc = newAppleLoc(
    displayWidth,
    displayheight,
    snakeLocs
  );

  return {
    xMove: 1,
    yMove: 0,
    snakeLocs: snakeLocs,
    appleLoc: appleLoc,
  };
}

export default class App extends Component {
  constructor(props) {
    super(props);

    Object.assign(this, defaultConsts);

    this.state = defaultState(
      this.DISPLAY_WIDTH,
      this.DISPLAY_HEIGHT
    );

    this.changeSnakeTravelDirection = this.changeSnakeTravelDirection.bind(
      this
    );
  }

  componentDidMount() {
    // Set up main update loop
    this.timerID = setInterval(
      () => this.tick(),
      this.FRAME_LENGTH
    );

    window.addEventListener(
      'keydown',
      this.changeSnakeTravelDirection
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    window.removeEventListener(
      'keydown',
      this.changeSnakeTravelDirection
    );
  }

  moveApple() {
    return newAppleLoc(
      this.DISPLAY_WIDTH,
      this.DISPLAY_HEIGHT,
      this.state.snakeLocs
    );
  }

  changeSnakeTravelDirection(e) {
    this.setState(state =>
      chooseNewDirection(e.key, state.xMove, state.yMove)
    );
  }

  // Main update loop
  tick() {
    this.setState(state => {
      // new Apple location defaults to original location
      let newAppleLoc = state.appleLoc;

      // If the Snake's head encounters the apple, move it and lengthen the snake
      let moveFn;
      if (isEqual(state.snakeLocs[0], state.appleLoc)) {
        moveFn = moveSnakeAndLengthen;
        newAppleLoc = this.moveApple();
      } else moveFn = moveSnake;

      // TODO: Handle the event that the Snake head encounters its own body

      // TODO: Handle the event that the Snake head encounters the wall

      return {
        snakeLocs: moveFn(
          state.snakeLocs,
          state.xMove,
          state.yMove,
          this.DISPLAY_WIDTH,
          this.DISPLAY_HEIGHT
        ),
        appleLoc: newAppleLoc,
      };
    });
  }

  render() {
    // Pixel for the Snake head
    const headLoc = this.state.snakeLocs[0];
    const head = (
      <RedPixel col={headLoc.x} row={headLoc.y} />
    );

    // Pixels for the Snake body
    const bodyLocs = this.state.snakeLocs
      .slice(1)
      .map((segment, index) => (
        <BlackPixel
          col={segment.x}
          row={segment.y}
          key={`bodyLocs-${index}-(${segment.x}, ${
            segment.y
          })`}
        />
      ));

    // Pixel for the Apple
    const apple = (
      <GreenPixel
        col={this.state.appleLoc.x}
        row={this.state.appleLoc.y}
      />
    );

    return (
      <Display
        width={this.DISPLAY_WIDTH}
        height={this.DISPLAY_HEIGHT}
      >
        {apple}
        {head}
        {bodyLocs}
      </Display>
    );
  }
}
