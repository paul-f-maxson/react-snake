// Return a copy of the snake where the first element is moved in the direction of motion and the rest are copies of snake[i-1]. The last element is dropped.
export const moveSnake = (
  snake,
  xMove,
  yMove,
  displayWidth,
  displayHeight
) => {
  // Make a 1-level-deep copy of the first elem of snake
  let newHead = Object.assign({}, snake[0]);
  // Move the head
  newHead.x = newHead.x + xMove;
  newHead.y = newHead.y + yMove;

  if (newHead.x > displayWidth) newHead.x = 1;

  if (newHead.x < 0) newHead.x = displayWidth;

  if (newHead.y > displayHeight) newHead.y = 1;

  if (newHead.y < 0) newHead.y = displayHeight;

  // Make a 1-level-deep copy of the snake, dropping the last element
  const newBody = snake
    .slice(0, -1)
    .map(elem => Object.assign({}, elem));

  let newSnake = [newHead, ...newBody];

  return newSnake;
};

export const chooseNewDirection = (
  key,
  currentXMove,
  currentYMove
) => {
  switch (key) {
    case 'ArrowUp':
      return { yMove: -1, xMove: 0 };
      break;
    case 'ArrowDown':
      return { yMove: 1, xMove: 0 };
    case 'ArrowRight':
      return { xMove: 1, yMove: 0 };
    case 'ArrowLeft':
      return { xMove: -1, yMove: 0 };
    default:
      return null;
  }
};
