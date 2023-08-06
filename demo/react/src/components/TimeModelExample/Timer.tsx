import { createTimeModel, useTimeModel } from "../../../../../src";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const timer = createTimeModel({
  initialTime: 10000,
  direction: "backward",
});

export const Timer = () => {
  const { value } = useTimeModel(timer);

  return <TimeModelValueView title="Timer" description="Simple timer that counts backwards from 10 seconds to 0 seconds" value={value} />;
};
