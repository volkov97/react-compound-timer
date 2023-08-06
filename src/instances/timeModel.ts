import {
  TimeModel,
  TimeModelEvents,
  TimeModelOptions,
} from "../models/TimeModel";

const defaultOptions: TimeModelOptions = {
  initialTime: 0,
  direction: "forward",
  timeToUpdate: 250,
  startImmediately: true,
  lastUnit: "d",
  roundUnit: "ms",
  checkpoints: [],
};

export const createTimeModel = (
  options: Partial<TimeModelOptions> = {},
  events: TimeModelEvents = {}
) => {
  const resultOptions = {
    ...defaultOptions,
    ...options,
  };

  return new TimeModel(resultOptions, events);
};
