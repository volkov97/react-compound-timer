import { useEffect, useMemo, useState } from "react";
import { TimeModel } from "../models/TimeModel";
import { TimerValue } from "../types";

export const useTimeModel = (timer: TimeModel) => {
  const [timerValue, setTimerValue] = useState(timer.value);

  useEffect(() => {
    setTimerValue(timer.value);

    const onChange = (timerValue: TimerValue) => {
      setTimerValue(timerValue);
    };

    timer.events = {
      ...timer.events,
      onChange,
    };

    return () => {
      timer.events = {
        ...timer.events,
        onChange: undefined,
      };
    };
  }, [timer]);

  const value = useMemo(
    () => ({
      value: timerValue,
      changeTime: timer.changeTime,
      changeLastUnit: timer.changeLastUnit,
      changeTimeToUpdate: timer.changeTimeToUpdate,
      changeDirection: timer.changeDirection,
      changeCheckpoints: timer.changeCheckpoints,
      start: timer.start,
      pause: timer.pause,
      resume: timer.resume,
      stop: timer.stop,
      reset: timer.reset,
    }),
    [timer, timerValue]
  );

  return value;
};
