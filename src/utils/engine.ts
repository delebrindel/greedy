import { DirectionItem, DIRECTIONS, Position } from "../enums/Directions";

const getNewPosition = (
  direction: DIRECTIONS,
  currentPosition: Position
): Position => {
  const POSITION_MAP = {
    [DIRECTIONS.UP]: { x: currentPosition.x, y: currentPosition.y - 1 },
    [DIRECTIONS.DOWN]: { x: currentPosition.x, y: currentPosition.y + 1 },
    [DIRECTIONS.RIGHT]: { x: currentPosition.x + 1, y: currentPosition.y },
    [DIRECTIONS.LEFT]: { x: currentPosition.x - 1, y: currentPosition.y },
  };


  return POSITION_MAP[direction];
};

export const moveOnGrid = (
  command: DirectionItem,
  currentPosition: Position,
  rows: number,
  columns: number
) => {
  const newPosition = getNewPosition(command.direction, currentPosition);
  return isValidSquare(newPosition, rows, columns)
    ? newPosition
    : currentPosition;
};

const isValidSquare = (
  newPosition: Position,
  rows: number,
  columns: number
) => {
  const isXValidX = newPosition.x < columns && newPosition.x >= 0;
  const isXValidY = newPosition.y < rows && newPosition.y >= 0;

  return isXValidX && isXValidY;
};


export const checkIfWin = (lastPosition: Position, exit: Position): Boolean => {
  return lastPosition.x === exit.x && lastPosition.y === exit.y;
};