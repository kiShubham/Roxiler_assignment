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
  const [monthVsSearch, setMonthVsSearch] = useState("month"); // setting preference
  const [old, setOldData] = useState({
    searchText: "",
    preference: "month",
    month: "",
  });

  const handleMonth = (data) => {
    let month = data.trim();
    if (data != "month") {
      setMonth(month);
    }
    setMonthVsSearch("month");
  };

  const handlePageNum = (bool) => {
    if (initialization)
      bool === true && transactionData.length > 0
        ? setPageNum((prev) => prev + 1)
        : pageNum > 1
        ? setPageNum((prev) => prev - 1)
        : null;
    return;
  };

  const handleSearch = (e) => {
    if (!initialization) {
      return window.alert(
        "initialze the data first ,\n Press `initalize Data` button"
      );
    }
    let text = e.target.value;
    !text.length ? setsSearchText("") : setsSearchText(text);
    setMonthVsSearch("search");
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
    if (initialization && (month || monthVsSearch === "search")) {
      const getTransactionData = async (
        month,
        pageNum,
        searchText,
        preference
      ) => {
        const res = await fetchAllTransactions(
          month,
          pageNum,
          searchText,
          preference
        );
        setTransactionData(res.data);
        // console.log(res.data);
      };
      const getStatsAndChartData = async (month) => {
        const res = await fetchAllData(month);
        setStatsAndChartData(res.data);
        // console.log(res.data);
      };

      const fetchData = async () => {
        await getTransactionData(month, pageNum, searchText, monthVsSearch);
        await getStatsAndChartData(month);
      };
      fetchData();

      const jumpBackToOne = (month, searchText, monthVsSearch) => {
        //if the searchText CHanges ;//if the preference changes ;// if the month chnges ;

        if (
          searchText !== old.searchText ||
          month !== old.month ||
          monthVsSearch !== old.preference
        ) {
          setPageNum(1);
          setOldData((prev) => ({
            ...prev,
            searchText: searchText,
          }));
          setOldData((prev) => ({
            ...prev,
            month: month,
          }));
          setOldData((prev) => ({
            ...prev,
            preference: monthVsSearch,
          }));
        }
      };
      jumpBackToOne(month, searchText, monthVsSearch);
    }
  }, [initialization, month, pageNum, searchText, monthVsSearch, old]);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <h1>Transactions Dashboard</h1>
        <DropDown monthHandler={handleMonth} monthBool={initialization} />
        <input
          type="text"
          className={styles.input}
          placeholder="search"
          onChange={handleSearch}
        />
      </div>
      <div className={styles.initializeBar}>
        <button onClick={handleInitializeBtn} className={styles.initializeBtn}>
          {initialization ? "Data Initialized" : "Initialize Data"}
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
        <Table
          data={transactionData}
          month={month}
          preference={monthVsSearch}
          searchText={searchText}
        />
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
          {transactionData.length === 0 && pageNum > 1
            ? "prev page"
            : "next page"}
        </button>
      </div>
    </div>
  );
};

export default Home;
