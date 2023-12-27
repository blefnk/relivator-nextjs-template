/** @see useRenderCount.tsx @see https://youtu.be/uH9uMH2e5Ts */

import { useEffect, useRef, useState } from "react";

const loadData = () =>
  new Promise<string>((resolve) => setTimeout(() => resolve("data 1"), 100));

const loadData2 = () =>
  new Promise<string>((resolve) => setTimeout(() => resolve("data 2"), 100));

const loadAllData = () => Promise.all([loadData(), loadData2()]);

const OneEffectPerAllData = () => {
  // Explicitly state that data can be null or an array of strings.
  const [data, setData] = useState<[string, string] | null>(null);

  useEffect(() => {
    // The resolved value from loadAllData is now correctly typed.
    loadAllData().then((result) => setData(result));
  }, []);

  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return (
    <>
      <div>
        {data ? `${data.join(", ")} (EffectPerServerCall)` : "Loading..."}
      </div>
      <div
        style={{ color: "red" }}
      >{`rendered ${renderCount.current} times`}</div>
    </>
  );
};

export default OneEffectPerAllData;
