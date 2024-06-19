/* eslint-disable react/prop-types */

import styles from "./Chart.module.css";
import { Chart } from "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";

const ChartComponent = ({ bool, pData, bData }) => {
  const samplePData = {
    categories: 1,
  };
  const sampleBData = {
    "0-100": 4,
    "101-200": 4,
    "201-300": 4,
    "301-400": 4,
    "401-500": 4,
    "501-600": 4,
    "601-700": 4,
    "701-800": 4,
    "801-900": 4,
    "901-above": 4,
  };

  Chart.defaults.font.size = 15;
  Chart.defaults.font.family = "JetBrains Mono";

  return (
    <div>
      {!bool ? (
        <div className={styles.pieChart}>
          <Pie
            className={styles.pchart}
            id="451"
            data={{
              labels: [...Object.keys(pData || samplePData)], //[label1, label2,label3]
              // labels: [],
              datasets: [
                {
                  label: "category",
                  data: Object.values(pData || samplePData), //array-[30,50,20]
                  borderRadius: 4,
                  borderWidth: 2,
                  fontColor: ["rgba(255,255,255,1)"],
                  borderColor: "rgba(255,255,255,0)",
                  spacing: 0.5,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(245, 158, 11,0.8)",
                    "rgba(250, 204, 21,0.8)",
                    "rgba(160, 0, 255, 0.8)",
                  ],
                  hoverOffset: 20,
                },
              ],
            }}
          />
        </div>
      ) : (
        <div className={styles.barChart}>
          <Bar
            className={styles.bchart}
            id="451"
            data={{
              labels: [...Object.keys(bData || sampleBData)], //[label1, label2,label3]
              // labels: [],
              datasets: [
                {
                  label: "Number of item in Price-range",
                  data: Object.values(bData || sampleBData), //array-[30,50,20]
                  borderRadius: 5,
                  fontColor: ["rgba(255,255,255,1)"],
                  spacing: 0.1,
                  backgroundColor: [
                    "rgba(245, 158, 11,0.2)",
                    "rgba(250, 204, 21,0.2)",
                    "rgba(160, 0, 255, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(225, 29, 72, 0.2)",
                  ],
                  borderColor: [
                    "rgba(245, 158, 11)",
                    "rgba(250, 204, 21)",
                    "rgba(160, 0, 255)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(225, 29, 72)",
                  ],
                  borderWidth: 2,
                  hoverOffset: 20,
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChartComponent;
