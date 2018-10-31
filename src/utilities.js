// Creates a function that returns a copy of the snake where the first element is moved in the direction of motion and the rest are copies of snake[i-1]. If lengthen is false, the function drops the last element of the returned snake.
const moveSnakeFn = lengthen => {
  let specialSlice;
  if (lengthen) specialSlice = arr => arr.slice();
  else specialSlice = arr => arr.slice(0, -1);

  return function(
    snake,
    xMove,
    yMove,
    displayWidth,
    displayHeight
  ) {
    // Makes a 1-level-deep copy of the first elem of snake
    let newHead = Object.assign({}, snake[0]);
    // Move the head
    newHead.x = newHead.x + xMove;
    newHead.y = newHead.y + yMove;

    // Wraps Snake to screen
    if (newHead.x > displayWidth) newHead.x = 1;

    if (newHead.x < 0) newHead.x = displayWidth;

    if (newHead.y > displayHeight) newHead.y = 1;

    if (newHead.y < 0) newHead.y = displayHeight;

    // Makes a 1-level-deep copy of the snake, possibly dropping the last element
    const newBody = specialSlice(snake).map(elem =>
      Object.assign({}, elem)
    );

    let newSnake = [newHead, ...newBody];

    return newSnake;
  };
};

export const moveSnakeAndLengthen = moveSnakeFn(true);
export const moveSnake = moveSnakeFn(false);

export function chooseNewDirection(key, currentMove) {
  // choose new x and y directions based on the key passed using this lookup table
  const newMove = {
    ArrowUp: { xMove: 0, yMove: -1 },
    ArrowDown: { xMove: 0, yMove: 1 },
    ArrowRight: { xMove: 1, yMove: 0 },
    ArrowLeft: { xMove: -1, yMove: 0 },
  }[key];

  // If the key passed was not in the table or if the new direction is a 180 degree turn from the current direction, return the current move parameters

  return !newMove ||
    newMove.yMove === -1 * currentMove.yMove ||
    newMove.xMove === -1 * currentMove.xMove
    ? currentMove
    : newMove;
}

export const newAppleLoc = (maxX, maxY, snakeLocs) => {
  let appleLoc = randomXY(maxX, maxY);
  const equalAppleLoc = elem => elem === appleLoc;
  while (snakeLocs.some(equalAppleLoc)) {
    appleLoc = randomXY(maxX, maxY);
  }
  return appleLoc;
};

const randomXY = (maxX, maxY) => {
  const x = Math.floor(Math.random() * maxX) + 1;
  const y = Math.floor(Math.random() * maxY) + 1;
  return { x: x, y: y };
};
