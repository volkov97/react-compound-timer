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
  <TimerContext.Consumer>
    {({ ms }) => <TimerValue value={ms} />}
  </TimerContext.Consumer>
);

const Seconds = () => (
  <TimerContext.Consumer>
    {({ s }) => <TimerValue value={s} />}
  </TimerContext.Consumer>
);

const Minutes = () => (
  <TimerContext.Consumer>
    {({ m }) => <TimerValue value={m} />}
  </TimerContext.Consumer>
);

const Hours = () => (
  <TimerContext.Consumer>
    {({ h }) => <TimerValue value={h} />}
  </TimerContext.Consumer>
);

const Days = () => (
  <TimerContext.Consumer>
    {({ d }) => <TimerValue value={d} />}
  </TimerContext.Consumer>
);

class Timer extends React.PureComponent {
  constructor(props) {
    super(props);

    const { initialTime, direction, timeToUpdate } = this.props;

    this.timer = new TimerModel({
      initialTime,
      direction,
      timeToUpdate,
      onChange: this.setState.bind(this),
    });

    this.state = {
      timerState: null,
    };

    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const { startImmediately } = this.props;

    startImmediately && this.timer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  start() {
    this.timer.start();
  }

  resume() {
    this.timer.resume();
  }

  pause() {
    this.timer.pause();
  }

  stop() {
    this.timer.stop();
  }

  reset() {
    this.timer.reset();
  }

  render() {
    const {
      start, pause, resume, stop, reset,
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
        {children({
          start,
          resume,
          pause,
          stop,
          reset,
          timerState,
        })}
      </TimerContext.Provider>
    );
  }
}

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

  startImmediately: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

export default Timer;
