import { DataAccess } from "../components/DataAccess";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>React + Zustand + IndedDB</h1>
      <div className={styles.contents}>
        <div className="card">
          <DataAccess />
        </div>
      </div>
    </div>
  );
}

export default App;
