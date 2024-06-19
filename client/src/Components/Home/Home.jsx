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
  const [pageNum, setPageNum] = useState(1);

  const handleMonth = (data) => {
    let month = data.trim();
    if (data != "month") {
      setMonth(month);
    }
  };

  const handlePageNum = (bool) => {
    if (initialization)
      bool === true && pageNum < 2
        ? setPageNum((prev) => prev + 1)
        : pageNum > 1
        ? setPageNum((prev) => prev - 1)
        : null;
    //not going beyond 2nd page , as no month has more than 10 items;after 2 coming back to 1
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
      const getTransactionData = async (month, pageNum) => {
        const res = await fetchAllTransactions(month, pageNum);
        setTransactionData(res.data);
        // console.log(res.data);
      };
      const getStatsAndChartData = async (month) => {
        const res = await fetchAllData(month);
        setStatsAndChartData(res.data);
        // console.log(res.data);
      };

      const fetchData = async () => {
        await getTransactionData(month, pageNum);
        await getStatsAndChartData(month);
      };
      fetchData();
    }
  }, [month, pageNum]);

  console.log(pageNum);
  console.log(transactionData);
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
        <button
          className={styles.initializeBtn}
          onClick={() => handlePageNum(false)}
        >
          prev page
        </button>
        <h3 style={{ color: "black" }}>{pageNum}</h3>
        <button
          className={styles.initializeBtn}
          onClick={() => handlePageNum(true)}
        >
          next page
        </button>
      </div>
    </div>
  );
};

export default Home;
