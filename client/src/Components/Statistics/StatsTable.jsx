import styles from "./StatsTable.module.css";
import DropDown from "../DropDown/DropDown";

const StatsTable = () => {
  return (
    <div>
      <div className={styles.statsHeader}>
        <h1>Statistics Dashboard!</h1>
        <DropDown />
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeadings}>
          <div className={styles.sale}>Total Sale</div>
          <div className={styles.sold}>Total sold Item</div>
          <div className={styles.notSold}>Total not sold Item</div>
        </div>
        <div className={styles.stats}>
          <div className={styles.sale}>100000</div>
          <div className={styles.sold}>55</div>
          <div className={styles.notSold}>15</div>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
