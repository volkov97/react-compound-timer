import getTimeParts from '../helpers/getTimeParts';

import TimerState from './TimerState';

export default class Timer {
  constructor({
    initialTime = 0,
    direction = 'forward',
    timeToUpdate = 1000,
    onChange = () => {},
  }) {
    this.time = initialTime;
    this.direction = direction;
    this.timeToUpdate = timeToUpdate;
    this._state = new TimerState(onChange);
    this._onChange = onChange;

    this.timerId = null;
  }

  get state() {
    return this._state.getState();
  }

  start() {
    const { timeToUpdate } = this;
    const repeatedFunc = () => {
      const updatedTime = this.computeTime();

      this._onChange({
        timeParts: getTimeParts(updatedTime),
      });
    };

    this._state.setPlaying();
    this.timerId = setInterval(repeatedFunc, timeToUpdate);

    repeatedFunc();
  }

  resume() {
    this._state.setPlaying();
  }

  pause() {
    this._state.setPaused();
  }

  stop() {
    this._state.setStopped();
    clearInterval(this.timerId);
  }

  computeTime() {
    const {
      _state, time, direction, timeToUpdate,
    } = this;

    if (_state.isPaused()) {
      return time;
    } if (_state.isPlaying()) {
      switch (direction) {
        case 'forward':
          this.time = time + timeToUpdate;
          return this.time;

        case 'backward': {
          this.time = time - timeToUpdate;

          if (this.time < 0) {
            this.stop();

            return 0;
          }

          return this.time;
        }

        default:
          return time;
      }
    } else {
      console.log(_state.getState());
      throw new Error('Internal error: unknown timer status...');
    }
  }
}
