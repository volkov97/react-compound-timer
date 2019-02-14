export const INITED = 'INITED';
export const PLAYING = 'PLAYING';
export const PAUSED = 'PAUSED';
export const STOPPED = 'STOPPED';

export type TimerStateType = 'INITED' | 'PLAYING' | 'PAUSED' | 'STOPPED';

export default class TimerState {
  private onChange: () => any;
  private state: TimerStateType = INITED;

  constructor(onChangeStatus = (obj: { timerState: TimerStateType }) => {}) {
    this.onChange = () => onChangeStatus({ timerState: this.state });
    this.state = INITED;
  }

  public getState() {
    return this.state;
  }

  public setInited() {
    if (this.state === INITED) {
      return false;
    }

    this.state = INITED;

    this.onChange();

    return true;
  }

  public isInited() {
    return this.state === INITED;
  }

  public setPlaying() {
    if (this.state === PLAYING) {
      return false;
    }

    this.state = PLAYING;

    this.onChange();

    return true;
  }

  public isPlaying() {
    return this.state === PLAYING;
  }

  public setPaused() {
    if (this.state !== PLAYING) {
      return false;
    }

    this.state = PAUSED;

    this.onChange();

    return true;
  }

  public isPaused() {
    return this.state === PAUSED;
  }

  public setStopped() {
    if (this.state === INITED) {
      return false;
    }

    this.state = STOPPED;

    this.onChange();

    return true;
  }

  public isStopped() {
    return this.state === STOPPED;
  }
}
