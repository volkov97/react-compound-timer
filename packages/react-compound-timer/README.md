# react-compound-timer

[![version](https://img.shields.io/badge/version-2.0.5-blue)](https://www.npmjs.com/package/react-compound-timer) [![npm type definitions](https://img.shields.io/badge/types-typescript-blue)](https://www.npmjs.com/package/react-compound-timer) [![downloads](https://img.shields.io/badge/downloads-12k%2Fmonth-brightgreen)](https://www.npmjs.com/package/react-compound-timer) [![coverage](https://img.shields.io/badge/coverage-88%25-green)](https://www.npmjs.com/package/react-compound-timer)

Custom react hook for creating timers, stopwatches, countdowns, etc.

Demo: https://volkov97.github.io/react-compound-timer/

## Installation

```bash
npm install react-compound-timer
```

## Usage

See [demo](https://github.com/volkov97/react-compound-timer/tree/master/demo/react) folder for usage example.

Examples:

- [Timer](https://github.com/volkov97/react-compound-timer/blob/master/demo/react/src/components/TimeModelExample/Timer.tsx)
- [Stopwatch](https://github.com/volkov97/react-compound-timer/blob/master/demo/react/src/components/TimeModelExample/Stopwatch.tsx)
- [More examples](https://github.com/volkov97/react-compound-timer/tree/master/demo/react/src/components/TimeModelExample)

Simple stopwatch:

```jsx
import { createTimeModel, useTimeModel } from "react-compound-timer";

// Create model, provide your own options object if needed
const stopwatch = createTimeModel();

export const Stopwatch = () => {
  // Use this model in any components with useTimeModel hook
  const { value } = useTimeModel(stopwatch);

  return <div>{value.s} seconds {value.ms} milliseconds</div>;
};
```

You can provide your own options object. See default options [here](https://github.com/volkov97/react-compound-timer/blob/master/packages/react-compound-timer/src/instances/timeModel.ts#L7).

Simple timer:

```jsx
import { createTimeModel, useTimeModel } from "react-compound-timer";
import { TimeModelValueView } from "../TimeModelValueView/TimeModelValueView";

const timer = createTimeModel({
  // start from 10 seconds
  initialTime: 10000,
  // count down
  direction: "backward",
});

export const Timer = () => {
  const { value } = useTimeModel(timer);

  return <div>{value.s} seconds {value.ms} milliseconds</div>;
};
```

Default options:

```js
{
  initialTime: 0,
  direction: "forward",
  timeToUpdate: 250,
  startImmediately: true,
  lastUnit: "d",
  roundUnit: "ms",
  checkpoints: [],
}
```
