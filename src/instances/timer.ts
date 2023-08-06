import {
  TimerEvents,
  TimerModel,
  TimerModelOptions,
} from "../models/TimerModel";

export const createTimer = (
  timerOptions: Partial<TimerModelOptions>,
  timerEvents: TimerEvents = {}
) => {
  const defaultOptions: TimerModelOptions = {
    initialTime: 0,
    direction: "forward",
    timeToUpdate: 1000,
    startImmediately: true,
    lastUnit: "d",
    roundUnit: "ms",
    checkpoints: [],
  };

  const resultTimerOptions = {
    ...defaultOptions,
    ...timerOptions,
  };

  return new TimerModel(resultTimerOptions, timerEvents);
};
