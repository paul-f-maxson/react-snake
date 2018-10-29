import * as utils from './utilities';

it('moves snake correctly', () => {
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
