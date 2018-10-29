import React, { Component } from "react";
import { Display, RedPixel, BlackPixel } from "./Presentational.js";

// A Snake renders an array of pixels passed in as props

const Snake = props => {
  const body = props.body.map((segment, index) => (
    <BlackPixel row={segment.y} col={segment.x} key={index} />
  ));

  return (
    <div>
      <RedPixel row={props.head.y} col={props.head.x} />
      {body}
    </div>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snake: [{ x: 4, y: 1 }, { x: 3, y: 1 }, { x: 2, y: 1 }, { x: 1, y: 1 }]
    };
  }

  // componentDidMount() {
  //   this.timerID = setInterval(() => this.tick(), 500);
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }
  //
  // tick() {
  //   this.setState(state => ({
  //     x: (state.x % 10) + 1,
  //     y: (state.y % 10) + 1
  //   }));
  // }

  render() {
    const headCoords = this.state.snake[0];
    const head = <RedPixel row={headCoords.y} col={headCoords.x} />;
    const body = this.state.snake
      .slice(1)
      .map((segment, index) => (
        <BlackPixel row={segment.y} col={segment.x} key={index} />
      ));

    return (
      <Display>
        {head}
        {body}
      </Display>
    );
  }
}
