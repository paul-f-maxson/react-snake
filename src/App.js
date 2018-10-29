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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.FRAMES_PER_SECOND = 30;
    this.FRAME_LENGTH = 1000 / this.FRAMES_PER_SECOND;
    this.DISPLAY_WIDTH = 40;
    this.DISPLAY_HEIGHT = 50;

    const snakeLocs = [
      { x: 4, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
    ];

    const appleLoc = newAppleLoc(
      this.DISPLAY_WIDTH,
      this.DISPLAY_HEIGHT,
      snakeLocs
    );

    this.state = {
      xMove: 1,
      yMove: 0,
      snakeLocs: snakeLocs,
      appleLoc: appleLoc,
    };

    this.changeDirection = this.changeDirection.bind(this);
  }

  moveApple() {
    return newAppleLoc(
      this.DISPLAY_WIDTH,
      this.DISPLAY_HEIGHT,
      this.state.snakeLocs
    );
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      this.FRAME_LENGTH
    );

    window.addEventListener(
      'keydown',
      this.changeDirection
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    window.removeEventListener(
      'keydown',
      this.changeDirection
    );
  }

  changeDirection(e) {
    this.setState(state =>
      chooseNewDirection(e.key, state.xMove, state.yMove)
    );
  }

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
    // Pixels for the Snake
    const headCoords = this.state.snakeLocs[0];
    const head = (
      <RedPixel col={headCoords.x} row={headCoords.y} />
    );
    const body = this.state.snakeLocs
      .slice(1)
      .map((segment, index) => (
        <BlackPixel
          col={segment.x}
          row={segment.y}
          key={`body-${index}-(${segment.x}, ${segment.y})`}
        />
      ));

    // Pixels for the Apple
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
        {body}
      </Display>
    );
  }
}
