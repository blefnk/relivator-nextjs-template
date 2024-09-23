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
      <button type="button" onClick={increment}>
        +1
      </button>
      <button type="button" onClick={decrement}>
        -1
      </button>
      <button type="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
