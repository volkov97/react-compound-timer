import { useEffect } from "react";
import { createTimeModel, useTimeModel } from "../../../../../src";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const roundByStopwatch = createTimeModel({
  // starting from 1 hour 11 minutes 10 seconds
  initialTime: 1 * 60 * 60 * 1000 + 11 * 60 * 1000 + 10 * 1000,
  roundUnit: "s",
  timeToUpdate: 10,
});

export const RoundByStopwatch = () => {
  const { value } = useTimeModel(roundByStopwatch);

  useEffect(() => {
    // stop after 20 seconds
    const timeout = setTimeout(() => {
      roundByStopwatch.stop();
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <TimeModelValueView
      title="RoundByStopwatch"
      description="Also stopwatch, but rounds milliseconds to seconds. Do not changes milliseconds. Here our time model starts from 1 hour 11 minutes 10 seconds."
      value={value}
    />
  );
};
