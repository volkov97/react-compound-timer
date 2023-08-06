import { TimeModel, TimeModelOptions } from "./TimeModel";

jest.useFakeTimers();

function getDefaultTimerOptions() {
  const defaultTimerOptions: TimeModelOptions = {
    initialTime: 0,
    direction: "forward",
    timeToUpdate: 1000,
    startImmediately: true,
    lastUnit: "d",
    roundUnit: "s",
    checkpoints: [],
  };

  return defaultTimerOptions;
}

describe("#TimeModel", () => {
  it("should set options", () => {
    const model = new TimeModel(getDefaultTimerOptions());

    expect(model.currentOptions).toEqual(getDefaultTimerOptions());
  });

  it("should change time", () => {
    const model = new TimeModel(getDefaultTimerOptions());

    model.changeTime(3000);

    expect(model.value).toEqual({
      d: 0,
      h: 0,
      m: 0,
      s: 3,
      ms: 0,
      state: "PLAYING",
    });
  });

  it("should change lastUnit", () => {
    const model = new TimeModel(getDefaultTimerOptions());

    model.changeLastUnit("m");

    // change time to 3 days
    model.changeTime(259200000);

    expect(model.value).toEqual({
      state: "PLAYING",
      d: 0,
      h: 0,
      m: 4320,
      ms: 0,
      s: 0,
    });
  });

  it("should change roundUnit", () => {
    const model = new TimeModel(getDefaultTimerOptions());

    model.changeRoundUnit("m");

    // change time to 3 days and 3 minutes
    model.changeTime(259200000 + 180000);

    expect(model.value).toEqual({
      state: "PLAYING",
      d: 3,
      h: 0,
      m: 3,
      ms: 0,
      s: 0,
    });
  });

  it("should change timeToUpdate", () => {
    const onChange = jest.fn();

    const model = new TimeModel(getDefaultTimerOptions(), { onChange });

    model.changeTimeToUpdate(2000);
    model.start();

    jest.advanceTimersByTime(1000);

    expect(onChange).toHaveBeenCalledTimes(4);
    expect(onChange).lastCalledWith({
      d: 0,
      h: 0,
      m: 0,
      s: 0,
      ms: 0,
      state: "PLAYING",
    });

    jest.advanceTimersByTime(1500);

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).lastCalledWith({
      d: 0,
      h: 0,
      m: 0,
      s: 2,
      ms: 0,
      state: "PLAYING",
    });
  });

  describe("events", () => {
    it("should call onChange event when time is changed", () => {
      const onChange = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onChange });

      model.changeTime(3000);

      expect(onChange).toHaveBeenCalledWith({
        state: "PLAYING",
        d: 0,
        h: 0,
        m: 0,
        s: 3,
        ms: 0,
      });
    });

    it("should call onStart event when timer is started", () => {
      const onStart = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onStart });

      model.start();

      expect(onStart).toHaveBeenCalled();
    });

    it("should call onPause event when timer is paused", () => {
      const onPause = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onPause });

      model.start();
      model.pause();

      expect(onPause).toHaveBeenCalled();
    });

    it("should not call onPause event when timer not started", () => {
      const onPause = jest.fn();

      const model = new TimeModel(
        {
          ...getDefaultTimerOptions(),
          startImmediately: false,
        },
        { onPause }
      );

      model.pause();

      expect(onPause).not.toHaveBeenCalled();
    });

    it("should not call onPause event when timer is already paused", () => {
      const onPause = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onPause });

      model.start();
      model.pause();
      model.pause();

      expect(onPause).toHaveBeenCalledTimes(1);
    });

    it("should call onResume event when timer is resumed", () => {
      const onResume = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onResume });

      model.start();
      model.pause();
      model.resume();

      expect(onResume).toHaveBeenCalled();
    });

    it("should not call onResume event when timer not started", () => {
      const onResume = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onResume });

      model.resume();

      expect(onResume).not.toHaveBeenCalled();
    });

    it("should not call onResume event when timer is not paused", () => {
      const onResume = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onResume });

      model.start();
      model.resume();

      expect(onResume).not.toHaveBeenCalled();
    });

    it("should call onStop event when timer is stopped", () => {
      const onStop = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onStop });

      model.start();
      model.stop();

      expect(onStop).toHaveBeenCalled();
    });

    it("should not call onStop event when timer not started", () => {
      const onStop = jest.fn();

      const model = new TimeModel(
        {
          ...getDefaultTimerOptions(),
          startImmediately: false,
        },
        { onStop }
      );

      model.stop();

      expect(onStop).not.toHaveBeenCalled();
    });

    it("should call onReset event when timer is reset", () => {
      const onReset = jest.fn();

      const model = new TimeModel(getDefaultTimerOptions(), { onReset });

      model.start();
      model.reset();

      expect(onReset).toHaveBeenCalled();
    });
  });
});
