import { DirectionItem, DIRECTIONS, Position } from "../enums/Directions";

type UseGridParams = {
  rows: number;
  columns: number;
}

export const useGrid = (params: UseGridParams) => {

  const {columns, rows} = params;

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

  const moveOnGrid = (
    command: DirectionItem,
    currentPosition: Position
  ) => {
    const newPosition = getNewPosition(command.direction, currentPosition);
    return isValidSquare(newPosition)
      ? newPosition
      : currentPosition;
  };

  const isValidSquare = (
    newPosition: Position,
  ) => {
    const isXValidX = newPosition.x < columns && newPosition.x >= 0;
    const isXValidY = newPosition.y < rows && newPosition.y >= 0;

    return isXValidX && isXValidY;
  };

  const checkIfWin = (lastPosition: Position, exit: Position): Boolean => {
    return lastPosition.x === exit.x && lastPosition.y === exit.y;
  };

  return { checkIfWin, moveOnGrid };
};
