"use client";

import { useStore } from "~/components/Modules/Zustand/zu-store";

const useCounter = () => {
  return useStore((store) => ({
    count: store.count,
    decrement: store.decrement,
    increment: store.increment,
    reset: store.reset,
  }));
};

const Counter = () => {
  const { count, decrement, increment, reset } = useCounter();

  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment} type="button">
        +1
      </button>
      <button onClick={decrement} type="button">
        -1
      </button>
      <button onClick={reset} type="reset">
        Reset
      </button>
    </div>
  );
};

export default Counter;
