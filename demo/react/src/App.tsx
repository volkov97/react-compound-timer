import s from "./App.module.css";
import { Separator } from "./components/Separator/Separator";

import { ChangeDirection } from "./components/TimeModelExample/ChangeDirection";
import { FrequentUpdatesStopwatch } from "./components/TimeModelExample/FrequentUpdatesStopwatch";
import { RoundByStopwatch } from "./components/TimeModelExample/RoundByStopwatch";
import { Stopwatch } from "./components/TimeModelExample/Stopwatch";
import { Timer } from "./components/TimeModelExample/Timer";

function App() {
  return (
    <div className={s.wrap}>
      <Stopwatch />
      <Separator />
      <RoundByStopwatch />
      <Separator />
      <FrequentUpdatesStopwatch />
      <Separator />
      <Timer />
      <Separator />
      <ChangeDirection />
    </div>
  );
}

export default App;
