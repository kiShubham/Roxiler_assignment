/* eslint-disable no-unused-vars */
import Table from "../Table/Table";
import styles from "./Home.module.css";
import DropDown from "../DropDown/DropDown";
import StatsTable from "../Statistics/StatsTable";
import ChartComponent from "../Chart/Chart";
import { useEffect, useState } from "react";
import { initialize, fetchAllData, fetchAllTransactions } from "../../apis/api";

const Home = () => {
  const [searchText, setsSearchText] = useState("");
  const [month, setMonth] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [statsAndChartData, setStatsAndChartData] = useState({});
  const [initialization, setInitialized] = useState(false);

  const handleMonth = (data) => {
    let month = data.trim();
    if (data != "month") {
      setMonth(data);
    }
  };

  const handleSearch = (e) => {
    let text = e.target.value;
  };
  const handleInitializeBtn = async () => {
    if (!initialization) {
      const status = await initialize();
      if (status === 200) {
        setTimeout(() => {
          setInitialized(true);
        }, 2000);
      }
    } else return;
  };

  useEffect(() => {
    if (initialization) {
      const getTransactionData = async (month) => {
        const res = await fetchAllTransactions(month);
        setTransactionData(res.data);
        // console.log(res.data);
      };
      const getStatsAndChartData = async (month) => {
        const res = await fetchAllData(month);
        setStatsAndChartData(res.data);
        // console.log(res.data);
      };

      const fetchData = async () => {
        await getTransactionData(month);
        await getStatsAndChartData(month);
      };
      fetchData();
    }
  }, [month]);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Transactions Dashboard</h1>
        <DropDown monthHandler={handleMonth} monthBool={initialization} />
        <input
          type="text"
          className={styles.input}
          placeholder="search"
          value={searchText}
          onChange={(e) => setsSearchText(e.target.value)}
        />
      </div>
      <div className={styles.initializeBar}>
        <button onClick={handleInitializeBtn} className={styles.initializeBtn}>
          {initialization ? "data initialized" : "initialize data"}
        </button>
        <div>
          <StatsTable
            month={month}
            sale={
              statsAndChartData.statistics ? statsAndChartData.statistics : 0
            }
          />
        </div>
      </div>
      <div className={styles.charts}>
        <ChartComponent bool={true} bData={statsAndChartData.barChart} />
        <ChartComponent bool={false} pData={statsAndChartData.pieChart} />
      </div>
      <div>
        <Table data={transactionData} />
      </div>
      <div className={styles.pagination}>
        <button className={styles.initializeBtn}>prev page</button>
        <button className={styles.initializeBtn}>next page</button>
      </div>
    </div>
  );
};

export default Home;
