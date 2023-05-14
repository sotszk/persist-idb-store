import * as React from "react";

import styles from "./DataAccess.module.css";

export const DataAccess = () => {
  const [dataItems, setDataItems] = React.useState([0]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.buttonContainer}>
          <button
            className={styles.clearDataButton}
            onClick={() => {
              setDataItems([]);
            }}
          >
            Clear data
          </button>
          <button
            className={styles.addDataButton}
            onClick={() => {
              const newItem = dataItems[dataItems.length - 1] + 1;
              setDataItems((items) => [...items, newItem]);
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
              <li key={item}>
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
