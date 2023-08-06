export type Unit = 'ms' | 's' | 'm' | 'h' | 'd';

export interface Checkpoint {
  time: number;
  callback: () => void;
}

export type Checkpoints = Checkpoint[];

export interface TimeParts {
  ms: number;
  s: number;
  m: number;
  h: number;
  d: number;
}

export type TimeModelStateValues = 'INITED' | 'PLAYING' | 'PAUSED' | 'STOPPED';

export type Direction = 'forward' | 'backward';

export type TimerValue = TimeParts & { state: TimeModelStateValues };
