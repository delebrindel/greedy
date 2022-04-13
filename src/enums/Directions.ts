export enum DIRECTIONS {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum CONTROLS {
  GO,
  RESET
}

export type Position = {
  x: number;
  y: number;
}

export type DirectionItem = {
  label: string;
  direction: DIRECTIONS;
};


export type ControlItem = {
  label: string;
  direction: CONTROLS;
};

export const CONTROL_OPTIONS: DirectionItem[] = [
  {
    label: "XII",
    direction: DIRECTIONS.UP,
  },
  {
    label: "III",
    direction: DIRECTIONS.RIGHT,
  },
  {
    label: "IX",
    direction: DIRECTIONS.LEFT,
  },
  {
    label: "VI",
    direction: DIRECTIONS.DOWN,
  },
];

export const DEFAULT_CONTROLS: ControlItem[] = [
  { label: "-", direction: CONTROLS.RESET },
  { label: "¤", direction: CONTROLS.GO },
];
