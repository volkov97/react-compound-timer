import { useEffect } from "react";
import { createTimeModel, useTimeModel } from "../../../../../src";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

// default model acts like simple stopwatch
const stopwatch = createTimeModel();

export const Stopwatch = () => {
  const { value } = useTimeModel(stopwatch);

  useEffect(() => {
    // stop after 20 seconds
    const timeout = setTimeout(() => {
      stopwatch.stop();
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  return <TimeModelValueView title="Stopwatch" description="Simplest and default time model - stopwatch. Just counts forward from 0. We are stopping stopwatch at 20 seconds. View updates every 250ms by default, but it can be changed via options." value={value} />;
};
