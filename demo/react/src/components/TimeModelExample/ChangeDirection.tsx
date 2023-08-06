import { useEffect } from "react";
import { createTimeModel, useTimeModel } from "react-compound-timer";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const changeDirectionModel = createTimeModel();

export const ChangeDirection = () => {
  const { value } = useTimeModel(changeDirectionModel);

  useEffect(() => {
    // change direction to backwards after 5 seconds
    const timeout = setTimeout(() => {
      changeDirectionModel.changeDirection("backward");
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return <TimeModelValueView title="ChangeDirection" description="Demo that shows how we can change direction dynamically, while time model is running." value={value} />;
};
