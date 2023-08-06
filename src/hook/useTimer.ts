import { useEffect, useMemo, useState } from "react";
import { TimerModel } from "../models/TimerModel";
import { TimerValue } from "../types";

export const useTimer: (timer: TimerModel) => void = (timer: TimerModel) => {
  const [timerValue, setTimerValue] = useState(timer.value);

  useEffect(() => {
    const onChange = (timerValue: TimerValue) => setTimerValue(timerValue);
    
    timer.events = {
      ...timer.events,
      onChange,
    };

    return () => {
      timer.events = {
        ...timer.events,
        onChange: undefined,
      };
    }
  }, [timer]);

  const returnValue = useMemo(() => ({
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
  }), [timer, timerValue]);

  return returnValue;
};