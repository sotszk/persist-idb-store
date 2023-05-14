import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { createSelectors } from "../utils/createSelectors";
import { persistStorage } from "../utils/persistStorage";

type Item = any;

type State = {
  items: Item[];
  addItem(item: Item): void;
  clearItem(): void;
};

const storeName = "persist-data-store";

export const usePersistDataStore = createSelectors(
  create<State>()(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) => set({ items: [...get().items, item] }),
        clearItem: () => set({ items: [] }),
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
