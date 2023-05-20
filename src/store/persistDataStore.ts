import { useRef, useEffect } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { createSelectors } from "../utils/createSelectors";
import { persistStorage } from "../utils/persistStorage";

type Item = any;

type State = {
  items: Item[];
  addItem(item: Item): void;
  clearItems(): void;
};

const storeName = "persist-data-store";

export const usePersistDataStore = createSelectors(
  create<State>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) => set({ items: [...get().items, item] }),
        clearItems: () => set({ items: [] }),
      }),
      {
        name: storeName,
        storage: createJSONStorage(() => persistStorage),
        onRehydrateStorage: (state) => {
          console.log("rehydrate", state);
        },
      }
    )
  )
);

export const usePersistData = () => {
  // const countRef = useRef(0);

  // useEffect(() => {
  //   countRef.current++;
  //   console.log("rendered:", countRef.current);
  // });

  return {
    items: usePersistDataStore.use.items(),
    addItem: usePersistDataStore.use.addItem(),
    clearItems: usePersistDataStore.use.clearItems(),
  };
};
