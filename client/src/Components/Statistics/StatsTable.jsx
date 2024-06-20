/* eslint-disable react/prop-types */
import styles from "./StatsTable.module.css";

const StatsTable = ({ month, sale }) => {
  let totalSale = sale.totalSale || 0;
  return (
    <div className={styles.stats}>
      <div className={styles.statsHeader}>
        stats for the month: {month || "--------"}
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeadings}>
          <div className={styles.sale}>Total Sale</div>
          <div className={styles.sold}>Total sold Item</div>
          <div className={styles.notSold}>Total not sold Item</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.stats}>
          <div className={styles.sale}>{totalSale.toFixed(2) || "00"}</div>
          <div className={styles.sold}>{sale.totalSoldItem || "00"}</div>
          <div className={styles.notSold}>{sale.unSoldItem || "00"}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
