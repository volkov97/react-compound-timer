import { useEffect } from "react";
import { createTimeModel, useTimeModel } from "../../../../../src";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const frequentUpdatesStopwatch = createTimeModel({
  // starting from 1 hour 11 minutes 10 seconds
  initialTime: 1 * 60 * 60 * 1000 + 11 * 60 * 1000 + 10 * 1000,
  timeToUpdate: 10,
});

export const FrequentUpdatesStopwatch = () => {
  const { value } = useTimeModel(frequentUpdatesStopwatch);

  useEffect(() => {
    // stop after 20 seconds
    const timeout = setTimeout(() => {
      frequentUpdatesStopwatch.stop();
    }, 60000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <TimeModelValueView
      title="FrequentUpdatesStopwatch"
      description="Demo that show that we can choose time to update our view. Here our time model starts from 1 hour 11 minutes 10 seconds."
      value={value}
    />
  );
};
