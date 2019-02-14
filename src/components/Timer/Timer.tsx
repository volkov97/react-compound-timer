import React from 'react';

import TimerModel from '../../lib/models/TimerModel';
import { TimePartsType } from 'src/lib/helpers/getTimeParts';
import { TimerStateType } from 'src/lib/models/TimerState';

const TimerContext = React.createContext<TimePartsType>({
  ms: 0,
  s: 0,
  m: 0,
  h: 0,
  d: 0,
});

class TimerValue extends React.Component<{ value: number }> {
  public shouldComponentUpdate(nextProps) {
    const { value } = this.props;

    if (value !== nextProps.value) {
      return true;
    }

    return false;
  }

  public render() {
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

interface TimerProps {
  /** Timer count direction */
  direction?: 'forward' | 'backward';
  /** Inittial time on timer */
  initialTime?: number;
  /** Time to rerender */
  timeToUpdate?: number;
  /** Start timer immediately after render */
  startImmediately?: boolean;
  /** Function that will be called on timer start */
  onStart?: () => any;
  /** Function that will be called on timer resume */
  onResume?: () => any;
  /** Function that will be called on timer pause */
  onPause?: () => any;
  /** Function that will be called on timer stop */
  onStop?: () => any;
  /** Function that will be called on timer reset */
  onReset?: () => any;
  /** Last unit will accumulate time, for example, 26 hours or 90 seconds */
  lastUnit?: 'ms' | 's' | 'm' | 'h' | 'd';
  /** Time checkpoints with callback functions */
  checkpoints?: Array<{
    time: number;
    callback: () => any;
  }>;
}

interface TimerState extends TimePartsType {
  timerState: TimerStateType;
}

class Timer extends React.PureComponent<TimerProps, TimerState> {
  public static Consumer = TimerContext.Consumer;
  public static Milliseconds = Milliseconds;
  public static Seconds = Seconds;
  public static Minutes = Minutes;
  public static Hours = Hours;
  public static Days = Days;

  public static defaultProps = {
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

  public static getUI(children, renderProps) {
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

  private timer: TimerModel;

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
      timerState: 'INITED',
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

  public componentDidMount() {
    const { startImmediately } = this.props;

    startImmediately && this.timer.start();
  }

  public componentWillUnmount() {
    this.timer.stop();
  }

  public render() {
    const {
      start, pause, resume, stop, reset,
      getTime, getTimerState,
      setTime, setDirection, setCheckpoints,
    } = this;
    const {
      ms, s, m, h, d, timerState,
    } = this.state;
    const { children } = this.props;

    return (
      <TimerContext.Provider
        value={{ ms, s, m, h, d }}
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

  private setTime(time) {
    this.timer.setTime(time);
  }

  private getTime() {
    return this.timer.getTime();
  }

  private getTimerState() {
    return this.timer.state;
  }

  private setDirection(direction) {
    this.timer.setDirection(direction);
  }

  private setCheckpoints(checkpoints) {
    this.timer.setCheckpoints(checkpoints);
  }

  private start() {
    this.timer.start();

    this.props.onStart();
  }

  private stop() {
    this.timer.stop();

    this.props.onStop();
  }

  private pause() {
    this.timer.pause();

    this.props.onPause();
  }

  private reset() {
    this.timer.reset();

    this.props.onReset();
  }

  private resume() {
    this.timer.resume();

    this.props.onResume();
  }
}

export default Timer;
