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
    });

    this.state = {
      timeParts: {},
    };
  }

  componentDidMount() {
    this.timer.startTimer(this.setState.bind(this));
  }

  componentWillUnmount() {
    this.timer.stopTimer();
  }

  render() {
    const { timeParts } = this.state;
    const { children } = this.props;

    return children({ ...timeParts });
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
