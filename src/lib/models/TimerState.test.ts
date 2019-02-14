import TimerState, { INITED } from './TimerState';

describe('#TimerState', () => {
  it('should set INITED state in constructor', () => {
    const state = new TimerState();

    expect(state.getState()).toEqual(INITED);
  });
});
