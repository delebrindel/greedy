import { FC } from "react";
import { Position } from "../enums/Directions";
import styles from "./Grid.module.scss";

type GridProps = {
  activePosition: Position;
  rows: number;
  columns: number;
  exit: Position;
};

export const Grid: FC<GridProps> = ({ activePosition, rows, columns, exit }) => {
  const COL_ARRAY = [...Array(columns).keys()];
  const ROW_ARRAY = [...Array(rows).keys()];

  return (
    <div className={styles.wrapper}>
      {ROW_ARRAY.map((rowNumber) => (
        <div className={styles.row} key={rowNumber}>
          {COL_ARRAY.map((colNumber) => (
            <div
              className={`${styles.innerCell} ${
                activePosition.y === rowNumber && activePosition.x === colNumber
                  ? styles.active
                  : ""
              }`}
              key={colNumber}
            >
              {colNumber === exit.x && rowNumber === exit.y && 'X'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
