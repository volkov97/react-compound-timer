import React from 'react';
import PropTypes from 'prop-types';

import TimerModel from '../../lib/models/TimerModel';

const TimerContext = React.createContext();

class TimerValue extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      return true;
    }

    return false;
  }

  render() {
    const { value } = this.props;

    return String(value) || null;
  }
}

const Milliseconds = () => (
  <Timer.Consumer>
    {({ ms }) => <TimerValue value={ms} />}
  </Timer.Consumer>
);

const Seconds = () => (
  <Timer.Consumer>
    {({ s }) => <TimerValue value={s} />}
  </Timer.Consumer>
);

const Minutes = () => (
  <Timer.Consumer>
    {({ m }) => <TimerValue value={m} />}
  </Timer.Consumer>
);

const Hours = () => (
  <Timer.Consumer>
    {({ h }) => <TimerValue value={h} />}
  </Timer.Consumer>
);

const Days = () => (
  <Timer.Consumer>
    {({ d }) => <TimerValue value={d} />}
  </Timer.Consumer>
);

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      initialTime, direction, timeToUpdate, lastUnit, checkpoints,
    } = this.props;

    this.timer = new TimerModel({
      initialTime,
      direction,
      timeToUpdate,
      lastUnit,
      checkpoints,
      onChange: this.setState.bind(this),
    });

    this.state = {
      ...this.timer.timeParts,
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.setTime = this.setTime.bind(this);
    this.getTime = this.getTime.bind(this);
    this.getTimerState = this.getTimerState.bind(this);
    this.setDirection = this.setDirection.bind(this);
    this.setCheckpoints = this.setCheckpoints.bind(this);
  }

  componentDidMount() {
    const { startImmediately } = this.props;

    startImmediately && this.timer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  static getUI(children, renderProps) {
    if (children === null) {
      return null;
    }

    if (Array.isArray(children) || React.isValidElement(children)) {
      return children;
    }

    if (children.prototype && children.prototype.isReactComponent) {
      return React.createElement(children, renderProps);
    }

    if (typeof children === 'function') {
      return children(renderProps);
    }

    throw new Error('Please use one of the supported APIs for children');
  }

  setTime(time) {
    this.timer.setTime(time);
  }

  getTime() {
    return this.timer.getTime();
  }

  getTimerState() {
    return this.timer.state;
  }

  setDirection(direction) {
    this.timer.setDirection(direction);
  }

  setCheckpoints(checkpoints) {
    this.timer.setCheckpoints(checkpoints);
  }

  start() {
    this.timer.start();

    this.props.onStart();
  }

  stop() {
    this.timer.stop();

    this.props.onStop();
  }

  pause() {
    this.timer.pause();

    this.props.onPause();
  }

  reset() {
    this.timer.reset();

    this.props.onReset();
  }

  resume() {
    this.timer.resume();

    this.props.onResume();
  }

  render() {
    const {
      start, pause, resume, stop, reset, getTime, getTimerState, setTime, setDirection, setCheckpoints,
    } = this;
    const {
      ms, s, m, h, d, timerState,
    } = this.state;
    const { children } = this.props;

    return (
      <TimerContext.Provider
        value={{
          ms, s, m, h, d,
        }}
      >
        {Timer.getUI(children, {
          start,
          resume,
          pause,
          stop,
          reset,
          getTime,
          getTimerState,
          setTime,
          setDirection,
          setCheckpoints,
          timerState,
        })}
      </TimerContext.Provider>
    );
  }
}

Timer.Consumer = TimerContext.Consumer;
Timer.Milliseconds = Milliseconds;
Timer.Seconds = Seconds;
Timer.Minutes = Minutes;
Timer.Hours = Hours;
Timer.Days = Days;

Timer.defaultProps = {
  timeToUpdate: 1000,
  direction: 'forward',
  initialTime: 0,
  startImmediately: true,
  lastUnit: 'd',
  checkpoints: [],
  children: null,
  onStart: () => {},
  onResume: () => {},
  onPause: () => {},
  onStop: () => {},
  onReset: () => {},
};

Timer.propTypes = {
  /** Timer count direction */
  direction: PropTypes.oneOf([
    'forward',
    'backward',
  ]),
  /** Inittial time on timer */
  initialTime: PropTypes.number,
  /** Time to rerender */
  timeToUpdate: PropTypes.number,
  /** Start timer immediately after render */
  startImmediately: PropTypes.bool,
  /** Function that will be called on timer start */
  onStart: PropTypes.func,
  /** Function that will be called on timer resume */
  onResume: PropTypes.func,
  /** Function that will be called on timer pause */
  onPause: PropTypes.func,
  /** Function that will be called on timer stop */
  onStop: PropTypes.func,
  /** Function that will be called on timer reset */
  onReset: PropTypes.func,
  /** Last unit will accumulate time, for example, 26 hours or 90 seconds */
  lastUnit: PropTypes.oneOf([
    'ms',
    's',
    'm',
    'h',
    'd',
  ]),
  /** Time checkpoints with callback functions */
  checkpoints: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.number,
    callback: PropTypes.func,
  })),

  children: PropTypes.any,
};

export default Timer;
