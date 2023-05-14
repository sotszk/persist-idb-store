import type { StateStorage } from "zustand/middleware";
import { db, objectStoreName } from "./idb";

export const persistStorage = {
  async getItem(key: string) {
    return (await db).get(objectStoreName, key);
    // const item = await (await db).get(objectStoreName, key);
    // console.log("item.length", item.length);
    // return item;
  },
  async setItem(key: string, value: any) {
    // json object として格納すると persist の hydrate/rehydrate がうまく動作しない（indexedDB のデータが復元されない）
    // (await db).put(objectStoreName, JSON.parse(value), key);
    (await db).put(objectStoreName, value, key);
  },
  async removeItem(key: string) {
    (await db).delete(objectStoreName, key);
  },
} satisfies StateStorage;

// トランザクションを使ったバージョン。イベントリスナーを設定したり、色々できるのはこっち。
export const persistStorageUsingTransaction = {
  async getItem(key: string) {
    const tx = (await db).transaction(objectStoreName);
    return tx.store.get(key);
  },
  async setItem(key: string, value: any) {
    const tx = (await db).transaction(objectStoreName, "readwrite");
    // tx.addEventListener("complete", () => {
    //   console.log("transaction completed");
    // });
    await tx.store.put(value, key);
  },
  async removeItem(key: string) {
    const tx = (await db).transaction(objectStoreName, "readwrite");
    tx.store.delete(key);
  },
} satisfies StateStorage;
