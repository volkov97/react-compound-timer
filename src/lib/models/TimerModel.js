import getTimeParts from '../helpers/getTimeParts';

export default class Timer {
  constructor({
    initialTime = 0,
    direction = 'forward',
    timeToUpdate = 1000,
  }) {
    this.time = initialTime;
    this.direction = direction;
    this.timeToUpdate = timeToUpdate;

    this.timerId = null;
  }

  startTimer(callback) {
    const { timeToUpdate } = this;

    const repeatedFunc = () => {
      const updatedTime = this.computeTime();

      callback({
        timeParts: getTimeParts(updatedTime),
      });
    };

    this.timerId = setInterval(repeatedFunc, timeToUpdate);

    repeatedFunc();
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  computeTime() {
    const { time, direction, timeToUpdate } = this;

    switch (direction) {
      case 'forward':
        this.time = time + timeToUpdate;
        return this.time;

      case 'backward': {
        this.time = time - timeToUpdate;

        if (this.time < 0) {
          this.stopTimer();

          return 0;
        }

        return this.time;
      }

      default:
        return time;
    }
  }
}
