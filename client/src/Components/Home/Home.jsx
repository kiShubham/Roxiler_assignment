import Table from "../Table/Table";
import styles from "./Home.module.css";
import DropDown from "../DropDown/DropDown";
import StatsTable from "../Statistics/StatsTable";

const Home = () => {
  return (
    <div>
      <StatsTable />
      <div className={styles.header}>
        <input type="text" className={styles.input} placeholder="search" />
        <h1 className="text-2xl font-bold underline">
          Transactions Dashboard!
        </h1>
        <DropDown />
      </div>
      <Table />
    </div>
  );
};

export default Home;
