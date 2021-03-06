import { FC, useState } from "react";
import { GRID_CONFIG } from "../enums/Config";
import { DirectionItem, Position } from "../enums/Directions";
import { useGrid } from "../hooks/use-grid";
import { useSound } from "../hooks/use-sound";
import { Controls } from "./Controls";
import { Grid } from "./Grid";



const INITIAL_POSITION = {
  x: 0,
  y: 0,
};

const INITIAL_STEP = -1;

type GridGameProps = {
  rows: number;
  columns: number;
  exit: Position;
};

export const GridGame: FC<GridGameProps> = ({ rows, columns, exit }) => {
  const [activePosition, setActivePosition] =
    useState<Position>(INITIAL_POSITION);
  const [activeStep, setActiveStep] = useState(INITIAL_STEP);
  const [finished, setFinished] = useState(false);

  const playClick = useSound({route: 'sounds/click.wav'});
  const playFail = useSound({route: 'sounds/fail.mp3'});

  const { moveOnGrid, checkIfWin } = useGrid({
    rows,
    columns,
  });

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
            const newPosition = moveOnGrid(input, lastState);
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
      if (checkIfWin(lastPosition, exit)) {
        alert("CONGRATS YOU WIN");
        playClick();
      } else {
        resetState();
        playFail();
      }
    });
  };

  return (
    <>
      <Grid
        exit={exit}
        rows={rows}
        columns={columns}
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
};
