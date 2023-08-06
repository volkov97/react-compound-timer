import { getTimeParts } from "../helpers/getTimeParts";
import { now } from "../helpers/now";

import { TimeModelState } from "./TimeModelState";
import { TimerValue, Unit, Checkpoints, Direction } from "../types";

export interface TimeModelOptions {
  initialTime: number;
  startImmediately: boolean;
  direction: "forward" | "backward";
  timeToUpdate: number;
  lastUnit: Unit;
  roundUnit: Unit;
  checkpoints: Checkpoints;
}

export interface TimeModelEvents {
  onChange?: (timerValue: TimerValue) => void;
  onStart?: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onStop?: () => void;
  onReset?: () => void;
}

export class TimeModel {
  private options: TimeModelOptions;
  public events: TimeModelEvents;

  private internalTime: number;
  private time: number;
  private innerState: TimeModelState;
  private timerId: number | null;

  constructor(options: TimeModelOptions, events: TimeModelEvents = {}) {
    this.internalTime = now();
    this.options = options;
    this.events = events;
    this.time = options.initialTime;
    this.innerState = new TimeModelState("INITED", () => {
      if (this.events.onChange) {
        this.events.onChange(this.value);
      }
    });

    this.timerId = null;

    if (this.options.startImmediately) {
      this.start();
    }
  }

  get value() {
    return this.getTimerValue(this.computeTime());
  }

  get currentOptions(): TimeModelOptions {
    return JSON.parse(JSON.stringify(this.options));
  }

  /**
   * Change options methods
   **/

  public changeTime = (time: number) => {
    this.internalTime = now();
    this.options.initialTime = time;
    this.time = this.options.initialTime;

    if (this.events.onChange) {
      this.events.onChange(this.getTimerValue(this.time));
    }
  };

  public changeLastUnit = (lastUnit: Unit) => {
    if (this.innerState.isPlaying()) {
      this.pause();
      this.options.lastUnit = lastUnit;
      this.resume(true);
    } else {
      this.options.lastUnit = lastUnit;
    }
  };

  public changeRoundUnit = (roundUnit: Unit) => {
    if (this.innerState.isPlaying()) {
      this.pause();
      this.options.roundUnit = roundUnit;
      this.resume(true);
    } else {
      this.options.roundUnit = roundUnit;
    }
  };

  public changeTimeToUpdate = (interval: number) => {
    if (this.innerState.isPlaying()) {
      this.pause();
      this.options.timeToUpdate = interval;
      this.resume();
    } else {
      this.options.timeToUpdate = interval;
    }
  };

  public changeDirection = (direction: Direction) => {
    this.options.direction = direction;
  };

  public changeCheckpoints = (checkpoints: Checkpoints) => {
    this.options.checkpoints = checkpoints;
  };

  /**
   * Timer controls methods
   **/

  public start = () => {
    if (this.innerState.setPlaying()) {
      this.setTimerInterval(true);

      if (this.events.onStart) {
        this.events.onStart();
      }
    }
  };

  public resume = (callImmediately = false) => {
    if (this.innerState.isPaused() && this.innerState.setPlaying()) {
      this.setTimerInterval(callImmediately);

      if (this.events.onResume) {
        this.events.onResume();
      }
    }
  };

  public pause = () => {
    if (this.innerState.setPaused()) {
      if (this.timerId) {
        clearInterval(this.timerId);
      }

      if (this.events.onPause) {
        this.events.onPause();
      }
    }
  };

  public stop = () => {
    if (this.innerState.setStopped()) {
      if (this.timerId) {
        clearInterval(this.timerId);
      }

      if (this.events.onStop) {
        this.events.onStop();
      }
    }
  };

  public reset = () => {
    this.time = this.options.initialTime;

    if (this.events.onChange) {
      this.events.onChange(this.getTimerValue(this.time));
    }

    if (this.events.onReset) {
      this.events.onReset();
    }
  };

  /**
   * Private methods
   **/

  private setTimerInterval = (callImmediately = false) => {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    this.internalTime = now();

    const repeatedFunc = () => {
      const oldTime = this.time;
      const updatedTime = this.computeTime();

      if (this.events.onChange) {
        this.events.onChange(this.getTimerValue(updatedTime));
      }

      this.options.checkpoints.map(({ time, callback }) => {
        const checkForForward = time > oldTime && time <= updatedTime;
        const checkForBackward = time < oldTime && time >= updatedTime;
        const checkIntersection =
          this.options.direction === "backward"
            ? checkForBackward
            : checkForForward;

        if (checkIntersection) {
          callback();
        }
      });
    };

    if (callImmediately && this.events.onChange) {
      this.events.onChange(this.getTimerValue(this.time));
    }

    this.timerId = window.setInterval(repeatedFunc, this.options.timeToUpdate);
  };

  private getTimerValue = (time: number): TimerValue => {
    return {
      ...getTimeParts(time, this.options.lastUnit, this.options.roundUnit),
      state: this.innerState.getState(),
    };
  };

  private computeTime = () => {
    if (this.innerState.isPlaying()) {
      const currentInternalTime = now();
      const delta = Math.abs(currentInternalTime - this.internalTime);

      switch (this.options.direction) {
        case "forward":
          this.time = this.time + delta;
          this.internalTime = currentInternalTime;

          return this.time;

        case "backward": {
          this.time = this.time - delta;
          this.internalTime = currentInternalTime;

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

    return this.time < 0 ? 0 : this.time;
  };
}
