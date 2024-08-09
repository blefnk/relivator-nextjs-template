import { useOptimistic as useOptimisticReact } from "react";

export function useOptimistic<TData extends { id: string }>(data: TData[]) {
  const [optimisticData, setOptimisticData] = useOptimisticReact(
    data,
    (
      state,
      {
        action,
        item,
      }: {
        action: "add" | "delete" | "update";
        item: TData;
      },
    ) => {
      switch (action) {
        case "delete":
          return state.filter((index) => index.id !== item.id);
        case "update":
          return state.map((index) => (index.id === item.id ? item : index));
        default:
          return [...state, item];
      }
    },
  );

  return [optimisticData, setOptimisticData] as const;
}
