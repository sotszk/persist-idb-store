import * as React from "react";
import { v4 as uuidv4 } from "uuid";

import { usePersistData } from "../../store";

import styles from "./DataAccess.module.css";

const DATA_LENGTH = 500;

export const DataAccess = () => {
  const { items: dataItems, addItem, clearItems } = usePersistData();

  React.useEffect(() => {
    const callback = (evt: StorageEvent) => {
      console.log(evt);
    };
    window.addEventListener("storage", callback);
    return () => {
      window.removeEventListener("storage", callback);
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.clearDataButton}
            onClick={() => clearItems()}
          >
            Clear data
          </button>
          <button
            className={styles.addDataButton}
            onClick={() => {
              const arr: number[] = [];
              for (let index = 0; index < DATA_LENGTH; index++) {
                arr.push(index);
              }
              const createNewItem = () => ({
                uuid: uuidv4(),
                data: arr.map(
                  () =>
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti facilis iusto autem, magnam eum iste. Tempora assumenda vero, excepturi ipsa expedita numquam in cum, eveniet cupiditate, quisquam voluptatum magnam ab."
                ),
              });
              addItem(createNewItem());
            }}
          >
            Add data
          </button>
        </div>

        <div className={styles.dataInfo}>
          <div className={styles.counter}>Item count: {dataItems.length}</div>
        </div>
      </header>

      <div className={styles.contents}>
        {dataItems.length === 0 && (
          <div className={styles.nodataLabel}>No data found</div>
        )}

        {dataItems.length > 0 && (
          <ul className={styles.datalist}>
            {dataItems.map((item) => (
              <li key={item.uuid}>
                <div className={styles.card}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti facilis iusto autem, magnam eum iste. Tempora
                  assumenda vero, excepturi ipsa expedita numquam in cum,
                  eveniet cupiditate, quisquam voluptatum magnam ab.
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
