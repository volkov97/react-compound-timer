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
    this._state = INITED;

    this._onChange();
  }

  isInited() {
    return this._state === INITED;
  }

  setPlaying() {
    this._state = PLAYING;

    this._onChange();
  }

  isPlaying() {
    return this._state === PLAYING;
  }

  setPaused() {
    this._state = PAUSED;

    this._onChange();
  }

  isPaused() {
    return this._state === PAUSED;
  }

  setStopped() {
    this._state = STOPPED;

    this._onChange();
  }

  isStopped() {
    return this._state === STOPPED;
  }
}
