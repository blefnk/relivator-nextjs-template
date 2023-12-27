import { useEffect, useState } from "react";
import { bind, shareLatest, Subscribe } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";
import { interval, Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map, scan, share, startWith, take } from "rxjs/operators";

/**
 * TODO: Implement. Planned to be used for
 * TODO: the other purposes in the future.
 *
 * @see https://react-rxjs.org/docs/motivation
 * @see https://youtube.com/watch?v=5ljDRXHQ5vo
 * @see https://react-rxjs.org/docs/core-concepts
 * @see https://react-rxjs.org/docs/getting-started
 * @see https://www.toptal.com/react/rxjs-react-state-management
 * @see https://blog.logrocket.com/rxjs-react-hooks-for-state-management
 */

/**
 * Renders a clock component that displays the current tick value and
 * triggers the onChange callback every second.
 *
 * @param {object} props - The props object that contains the onChange
 *                         callback function.
 * @param {Function} props.onChange - The callback function that will be
 *                                     called every second with the current
 *                                     tick value.
 * @return {JSX.Element} The clock component.
 */
const Clock = ({ onChange }: { onChange: (n: number) => void }) => {
  console.log("rendering clock");
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      onChange(++tick);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Clock is ticking</div>;
};

const ClockWatcher = ({ ticks }: { ticks: number }) => {
  console.log("rendering watcher");

  return <div>Ticks: {ticks}</div>;
};

export const ParentTestComponent = () => {
  console.log("rendering parent");
  const [ticks, setTicks] = useState(0);

  return (
    <div>
      <div style={{ padding: "10px", border: "1px solid gray" }}>
        <span>React FGR sample</span>
        <Clock onChange={(n) => setTicks(n)} />
        <ClockWatcher ticks={ticks} />
      </div>
    </div>
  );
};
