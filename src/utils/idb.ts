import { openDB } from "idb";

export const objectStoreName = "datastore";

export const db = openDB<any>("myDB", 1, {
  async upgrade(db) {
    db.createObjectStore(objectStoreName);
  },
});
