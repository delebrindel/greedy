import { FC, useEffect, useState } from "react";
import {
  ControlItem,
  CONTROLS,
  CONTROL_OPTIONS,
  DEFAULT_CONTROLS,
  DirectionItem,
} from "../enums/Directions";
import styles from "./Controls.module.scss";

type ControlsProps = {
  maxCommands: number;
  onGo: (commands: DirectionItem[]) => void;
  onReset: () => void;
  activeStep: number;
  finished: boolean;
};

export const Controls: FC<ControlsProps> = ({
  maxCommands,
  onGo,
  onReset,
  activeStep,
  finished,
}) => {
  const [enteredInputs, setEnteredInputs] = useState<DirectionItem[]>([]);

  const resetState = () => {
    setEnteredInputs([]);
    onReset();
  };
  useEffect(() => {
    finished && setEnteredInputs([]);
  }, [finished]);

  const onEnterCommand = (command: DirectionItem | ControlItem) => {
    if (DEFAULT_CONTROLS.includes(command as ControlItem)) {
      command.direction === CONTROLS.RESET && resetState();
      command.direction === CONTROLS.GO && onGo(enteredInputs);
    } else {
      enteredInputs.length < maxCommands &&
        setEnteredInputs((lastState) => [
          ...lastState,
          command as DirectionItem,
        ]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.controlBar}>
        {CONTROL_OPTIONS.map((controlItem) => (
          <div
            onClick={() => {
              onEnterCommand(controlItem);
            }}
            className={styles.controlItem}
            key={controlItem.direction}
          >
            {controlItem.label}
          </div>
        ))}
        {DEFAULT_CONTROLS.map((controlItem) => (
          <div
            onClick={() => {
              onEnterCommand(controlItem);
            }}
            className={styles.controlItem}
            key={controlItem.direction}
          >
            {controlItem.label}
          </div>
        ))}
      </div>
      <div className={styles.enteredInputs}>
        {enteredInputs.length > 0 &&
          enteredInputs.map((input, itemNum) => (
            <div
              className={`${styles.inputItem} ${
                activeStep === itemNum ? styles.active : ""
              }`}
              key={itemNum}
            >
              {input.label}
            </div>
          ))}
      </div>
    </div>
  );
};
