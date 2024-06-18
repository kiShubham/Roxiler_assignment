import axios from "axios";

const Backend_EndPoint = "http://localhost:5000";

//-------------------------------transacitions-------------------------------

export const initialize = async () => {
  try {
    const res = await axios.get(`${Backend_EndPoint}/api/transactions/`);
    console.log(res.status); //200
    return res.status;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllTransactions = async (month) => {
  try {
    const res = await axios.get(
      `${Backend_EndPoint}/api/transactions/all?month=${month}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStatisticsData = async (month) => {
  try {
    const res = await axios.get(
      `${Backend_EndPoint}/api/transactions/stats?month=${month}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
export const fetchPieChartData = async (month) => {
  try {
    const res = await axios.get(
      `${Backend_EndPoint}/api/transactions/pChart?month=${month}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchBarChartData = async (month) => {
  try {
    const res = await axios.get(
      `${Backend_EndPoint}/api/transactions/bChart?month=${month}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllData = async (month) => {
  try {
    const res = await axios.get(
      `${Backend_EndPoint}/api/transactions/figures?month=${month}`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
