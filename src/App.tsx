import { useState } from "react";
import { Controls } from "./components/Controls";
import { Grid } from "./components/Grid";
import { DirectionItem, Position } from "./enums/Directions";
import { checkIfWin, moveOnGrid } from "./utils/engine";
import { GRID_CONFIG } from "./enums/Config";

const INITIAL_POSITION = {
  x: 0,
  y: 0,
};

const EXIT_CELL = {
  x: 3,
  y: 2,
};

const INITIAL_STEP = -1;

function App() {
  const [activePosition, setActivePosition] =
    useState<Position>(INITIAL_POSITION);
  const [activeStep, setActiveStep] = useState(INITIAL_STEP);
  const [finished, setFinished] = useState(false);

  const resetState = () => {
    setActivePosition(INITIAL_POSITION);
    setActiveStep(INITIAL_STEP);
    setFinished(true);
    setTimeout(() => {
      setFinished(false);
    }, GRID_CONFIG.TIMEOUT);
  };

  const moveItems = (commands: DirectionItem[]): Promise<Position> => {
    return new Promise((resolve) => {
      commands.forEach((input, count) => {
        setTimeout(() => {
          setActivePosition((lastState) => {
            const newPosition = moveOnGrid(
              input,
              lastState,
              GRID_CONFIG.ROWS,
              GRID_CONFIG.COLUMNS
            );
            count === commands.length - 1 &&
              setTimeout(() => {
                resolve(newPosition);
              }, GRID_CONFIG.TIMEOUT);
            return newPosition;
          });
          setActiveStep(count);
        }, count * GRID_CONFIG.TIMEOUT + 500);
      });
    });
  };

  const onGo = async (commands: DirectionItem[]) => {
    await moveItems(commands).then((lastPosition: Position) => {
      checkIfWin(lastPosition, EXIT_CELL)
        ? alert("CONGRATS YOU WIN")
        : resetState();
    });
  };

  return (
    <>
      <Grid
        exit={EXIT_CELL}
        rows={GRID_CONFIG.ROWS}
        columns={GRID_CONFIG.COLUMNS}
        activePosition={activePosition}
      />
      <Controls
        finished={finished}
        onGo={onGo}
        onReset={resetState}
        activeStep={activeStep}
        maxCommands={5}
      />
    </>
  );
}

export default App;
