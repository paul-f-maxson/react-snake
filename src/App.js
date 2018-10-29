import React, { Component } from 'react';
import {
  Display,
  RedPixel,
  BlackPixel,
} from './Presentational.js';
import {
  moveSnake,
  chooseNewDirection,
} from './utilities.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      xMove: 1,
      yMove: 0,
      snake: [
        { x: 4, y: 1 },
        { x: 3, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ],
    };

    this.DISPLAY_WIDTH = 40;
    this.DISPLAY_HEIGHT = 50;

    this.changeDirection = this.changeDirection.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 50);

    window.addEventListener(
      'keydown',
      this.changeDirection
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  changeDirection(e) {
    this.setState(state =>
      chooseNewDirection(e.key, state.xMove, state.yMove)
    );
  }

  tick() {
    this.setState(state => {
      const newSnake = moveSnake(
        state.snake,
        state.xMove,
        state.yMove,
        this.DISPLAY_WIDTH,
        this.DISPLAY_HEIGHT
      );
      return { snake: newSnake };
    });
  }

  render() {
    const headCoords = this.state.snake[0];
    const head = (
      <RedPixel row={headCoords.y} col={headCoords.x} />
    );
    const body = this.state.snake
      .slice(1)
      .map((segment, index) => (
        <BlackPixel
          row={segment.y}
          col={segment.x}
          key={index}
        />
      ));

    return (
      <Display
        width={this.DISPLAY_WIDTH}
        height={this.DISPLAY_HEIGHT}
      >
        {head}
        {body}
      </Display>
    );
  }
}
