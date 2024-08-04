import { createContext, use } from "react";

import { createStore, useStore as useZustandStore } from "zustand";

type StoreInterface = {
  count: number;
  decrement: () => void;
  increment: () => void;
  lastUpdate: number;
  light: boolean;
  reset: () => void;
  tick: (lastUpdate: number, light: boolean) => void;
};

const getDefaultInitialState = () => ({
  count: 0,
  lastUpdate: Date.now(),
  light: false,
});

// eslint-disable-next-line no-use-before-define
export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<null | StoreType>(null);

// todo: add a consumer
export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = use(zustandContext);

  if (!store) {
    throw new Error("Store is missing the provider");
  }

  return useZustandStore(store, selector);
};

export const initializeStore = (
  preloadedState: Partial<StoreInterface> = {
    //
  },
) => {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    decrement: () => {
      set({
        count: get().count - 1,
      });
    },
    increment: () => {
      set({
        count: get().count + 1,
      });
    },
    reset: () => {
      set({
        count: getDefaultInitialState().count,
      });
    },
    tick: (lastUpdate, light) => {
      set({
        lastUpdate,
        light: light,
      });
    },
  }));
};
