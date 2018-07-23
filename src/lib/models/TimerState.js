export const INITED = 'INITED';
export const PLAYING = 'PLAYING';
export const PAUSED = 'PAUSED';
export const STOPPED = 'STOPPED';

export default class TimerState {
  constructor(onChangeStatus = () => {}) {
    this._onChange = () => onChangeStatus({ timerState: this._state });
    this._state = INITED;
  }

  getState() {
    return this._state;
  }

  setInited() {
    if (this._state === INITED) return false;

    this._state = INITED;

    this._onChange();

    return true;
  }

  isInited() {
    return this._state === INITED;
  }

  setPlaying() {
    if (this._state === PLAYING) return false;

    this._state = PLAYING;

    this._onChange();

    return true;
  }

  isPlaying() {
    return this._state === PLAYING;
  }

  setPaused() {
    if (this._state !== PLAYING) return false;

    this._state = PAUSED;

    this._onChange();

    return true;
  }

  isPaused() {
    return this._state === PAUSED;
  }

  setStopped() {
    if (this._state === INITED) return false;

    this._state = STOPPED;

    this._onChange();

    return true;
  }

  isStopped() {
    return this._state === STOPPED;
  }
}
