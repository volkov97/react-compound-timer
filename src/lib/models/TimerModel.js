import getTimeParts from '../helpers/getTimeParts';

import TimerState from './TimerState';
import Units from './Units';

export default class Timer {
  constructor({
    initialTime = 0,
    direction = 'forward',
    timeToUpdate = 1000,
    lastUnit = Units.d,
    onChange = () => {},
  }) {
    this.initialTime = initialTime;
    this.time = initialTime;
    this.direction = direction;
    this.timeToUpdate = timeToUpdate;
    this.lastUnit = lastUnit;
    this._state = new TimerState(onChange);
    this._onChange = onChange;

    this.timerId = null;
  }

  get state() {
    return this._state.getState();
  }

  get timeParts() {
    return this._getTimeParts(this._computeTime());
  }

  _getTimeParts(time) {
    return getTimeParts(time, this.lastUnit);
  }

  _setTimerInterval(callImmediately = false) {
    const { timeToUpdate } = this;
    const repeatedFunc = () => {
      const updatedTime = this._computeTime();

      this._onChange({
        ...this._getTimeParts(updatedTime),
      });
    };

    callImmediately && this._onChange({
      ...this._getTimeParts(this.time),
    });

    this.timerId = setInterval(repeatedFunc, timeToUpdate);
  }

  start() {
    if (this._state.setPlaying()) {
      this._setTimerInterval(true);
    }
  }

  resume() {
    if (!this._state.isStopped() && this._state.setPlaying()) {
      this._setTimerInterval();
    }
  }

  pause() {
    if (this._state.setPaused()) {
      clearInterval(this.timerId);
    }
  }

  stop() {
    if (this._state.setStopped()) {
      clearInterval(this.timerId);
    }
  }

  reset() {
    this.time = this.initialTime;

    this._onChange({
      ...this._getTimeParts(this.time),
    });
  }

  _computeTime() {
    const {
      _state, time, direction, timeToUpdate,
    } = this;

    if (_state.isPlaying()) {
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
      console.warn('Internal error: unknown timer status...');

      return time;
    }
  }
}
