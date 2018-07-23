import React from 'react';
import PropTypes from 'prop-types';

import TimerModel from '../../lib/models/TimerModel';

class Timer extends React.Component {
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
      timeParts: {},
      timerState: null,
    };

    this.pauseTimer = this.pauseTimer.bind(this);
    this.resumeTimer = this.resumeTimer.bind(this);
  }

  componentDidMount() {
    this.timer.start();
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  resumeTimer() {
    this.timer.resume();
  }

  pauseTimer() {
    this.timer.pause();
  }

  render() {
    const { pauseTimer, resumeTimer } = this;
    const { timeParts, timerState } = this.state;
    const { children } = this.props;

    return children({
      ...timeParts,
      pauseTimer,
      resumeTimer,
      timerState,
    });
  }
}

Timer.defaultProps = {
  timeToUpdate: 1000,
  direction: 'forward',
  initialTime: 0,
};

Timer.propTypes = {
  /** Timer count direction */
  direction: PropTypes.oneOf([
    'forward',
    'backward',
  ]),
  /** Inittial time on timer */
  initialTime: PropTypes.number,
  /** Update delay */
  timeToUpdate: PropTypes.number,
  /** Render props function */
  children: PropTypes.func.isRequired,
};

export default Timer;
