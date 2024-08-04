import type { ReactElement } from "react";
import { useEffect, useState } from "react";

// 🔴 DEPRECATED AND POSSIBLY WILL BE REMOVED IN RELIVATOR 1.3.0 🔴 ||
// ================================================================= ||
const Clock = ({
  onChange,
}: {
  onChange: (n: number) => void;
}): ReactElement => {
  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      onChange(++tick);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Clock is ticking</div>;
};

const ClockWatcher = ({
  ticks,
}: {
  ticks: number;
}) => <div>Ticks: {ticks}</div>;

export const ParentTestComponent = () => {
  const [ticks, setTicks] = useState(0);

  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
        }}
      >
        <span>React FGR sample</span>
        <Clock
          onChange={(n) => {
            setTicks(n);
          }}
        />
        <ClockWatcher ticks={ticks} />
      </div>
    </div>
  );
};
