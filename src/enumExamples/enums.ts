enum Direction {
  Up,
  Down,
  Left,
  Right,
}

function move(direction: Direction): void {
  switch (direction) {
    case Direction.Up:
      console.log("Moving up");
      break;
    case Direction.Down:
      console.log("Moving down");
      break;
    case Direction.Left:
      console.log("Moving left");
      break;
    case Direction.Right:
      console.log("Moving right");
      break;
    default:
      console.log("Invalid direction");
  }
}

const chosenDirection: Direction = Direction.Right;
move(chosenDirection);
