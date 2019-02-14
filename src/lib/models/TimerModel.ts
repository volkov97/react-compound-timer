import getTimeParts, { Unit, TimePartsType } from '../helpers/getTimeParts';

import TimerState from './TimerState';

export interface Checkpoint {
  time: number;
  callback: () => any;
}

export type Direction = 'forward' | 'backward';

export default class Timer {
  private initialTime: number;
  private time: number;
  private direction: Direction;
  private timeToUpdate: number;
  private lastUnit: Unit;
  private checkpoints: Checkpoint[];
  private innerState: TimerState;
  private onChange: (timeParts?: TimePartsType) => any;
  private timerId: number;

  constructor({
    initialTime = 0,
    direction = 'forward',
    timeToUpdate = 1000,
    lastUnit = 'd',
    checkpoints = [],
    onChange = () => {},
  }: {
    initialTime: number;
    direction: Direction;
    timeToUpdate: number;
    lastUnit: Unit;
    checkpoints: Checkpoint[];
    onChange: () => any;
  }) {
    this.initialTime = initialTime;
    this.time = initialTime;
    this.direction = direction;
    this.timeToUpdate = timeToUpdate;
    this.lastUnit = lastUnit;
    this.checkpoints = checkpoints;
    this.innerState = new TimerState(onChange);
    this.onChange = onChange;

    this.timerId = null;
  }

  get state() {
    return this.innerState.getState();
  }

  get timeParts() {
    return this.getTimeParts(this.computeTime());
  }

  public getTimeParts(time) {
    return getTimeParts(time, this.lastUnit);
  }

  public setTime(time) {
    this.time = time;
  }

  public getTime() {
    return this.time;
  }

  public setDirection(direction) {
    this.direction = direction;
  }

  public setCheckpoints(checkpoints) {
    this.checkpoints = checkpoints;
  }

  public start() {
    if (this.innerState.setPlaying()) {
      this.setTimerInterval(true);
    }
  }

  public resume() {
    if (!this.innerState.isStopped() && this.innerState.setPlaying()) {
      this.setTimerInterval();
    }
  }

  public pause() {
    if (this.innerState.setPaused()) {
      clearInterval(this.timerId);
    }
  }

  public stop() {
    if (this.innerState.setStopped()) {
      clearInterval(this.timerId);
    }
  }

  public reset() {
    this.time = this.initialTime;

    this.onChange(this.getTimeParts(this.time));
  }

  private setTimerInterval(callImmediately = false) {
    const repeatedFunc = () => {
      const oldTime = this.time;
      const updatedTime = this.computeTime();

      this.onChange(this.getTimeParts(updatedTime));

      this.checkpoints.map(({ time, callback }) => {
        const checkForForward = time > oldTime && time <= updatedTime;
        const checkForBackward = time < oldTime && time >= updatedTime;
        const checkIntersection = this.direction === 'backward' ? checkForBackward : checkForForward;

        if (checkIntersection) {
          callback();
        }
      });
    };

    callImmediately && this.onChange(this.getTimeParts(this.time));

    this.timerId = setInterval(repeatedFunc, this.timeToUpdate);
  }

  private computeTime() {
    if (this.innerState.isPlaying()) {
      switch (this.direction) {
        case 'forward':
          this.time = this.time + this.timeToUpdate;
          return this.time;

        case 'backward': {
          this.time = this.time - this.timeToUpdate;

          if (this.time < 0) {
            this.stop();

            return 0;
          }

          return this.time;
        }

        default:
          return this.time;
      }
    }

    return this.time;
  }
}
