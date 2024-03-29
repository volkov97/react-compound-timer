import { TimeModelStateValues } from "../types";

export const INITED = "INITED";
export const PLAYING = "PLAYING";
export const PAUSED = "PAUSED";
export const STOPPED = "STOPPED";

export class TimeModelState {
  private onStateChange: (obj: { state: TimeModelStateValues }) => void;
  private state: TimeModelStateValues = INITED;

  constructor(
    initialStatus: TimeModelStateValues = INITED,
    onStateChange: (obj: { state: TimeModelStateValues }) => void = () => {}
  ) {
    this.state = initialStatus;
    this.onStateChange = onStateChange;
  }

  public setOnStateChange(
    onStateChange: (obj: { state: TimeModelStateValues }) => void
  ) {
    this.onStateChange = onStateChange;
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

  private onChange() {
    this.onStateChange({ state: this.state });
  }
}
