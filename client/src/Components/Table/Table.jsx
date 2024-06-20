/* eslint-disable react/prop-types */
import styles from "./Table.module.css";
// import data from "../../assets/seedData.json";

const Table = ({ data, month, preference, searchText }) => {
  return (
    <div>
      <div className={styles.specialClass}>
        {preference === "search" && searchText
          ? `search result for : ${searchText} `
          : month
          ? `Month : ${month}`
          : preference === "search" && !searchText
          ? `showing all items`
          : `Month : ------`}
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeadings}>
          <div className={styles.id}>ID</div>
          <div className={styles.title}>Title</div>
          <div className={styles.description}>Description</div>
          <div className={styles.prices}>Prices</div>
          <div className={styles.category}>Category</div>
          <div className={styles.sold}>Sold</div>
          <div className={styles.image}>Image</div>
        </div>
        {data.map((e) => {
          return (
            <div className={styles.transaction} key={e.id}>
              <div className={styles.id}>{e.id}</div>
              <div className={styles.title}>{e.title}</div>
              <div className={styles.description}>{e.description}</div>
              <div className={styles.prices}>{e.price.toFixed(2)}</div>
              <div className={styles.category}>{e.category}</div>
              <div className={styles.sold}>
                {e.sold === true ? "soldout" : "available"}
              </div>
              <div className={styles.image}>
                <img width={68} height={68} src={e.image} alt="itemImage" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
