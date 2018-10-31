import * as utils from './utilities';

it('updates snake correctly', () => {
  const origSnake = [
    { x: 4, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 2 },
  ];

  const expectedSnake = [
    { x: 5, y: 2 },
    { x: 4, y: 2 },
    { x: 3, y: 2 },
  ];
  expect(utils.moveSnake(origSnake, 1, 0, 10, 10)).toEqual(
    expectedSnake
  );
});

it('allows 90 degree turns', () => {
  const dummyState = {
    xMove: 1,
    yMove: 0,
  };

  expect(
    utils.chooseNewDirection('ArrowUp', {
      ...dummyState.xMove,
      ...dummyState.yMove,
    })
  ).toEqual({ xMove: 0, yMove: -1 });
});

it('does not allow 180 degree turns', () => {
  const dummyState = {
    xMove: 0,
    yMove: 1,
  };

  expect(
    utils.chooseNewDirection(
      'ArrowUp',
      Object.assign({}, dummyState)
    )
  ).toEqual(dummyState);
});
