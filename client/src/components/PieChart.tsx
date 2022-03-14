import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
type IProps = {
  labels: Array<string>;
  data: Array<number>;
};

const PieChart = (props: IProps) => {
  const { labels, data } = props;
  const allData = {
    labels: labels,
    datasets: [
      {
        label: "RCGW",
        data: data,
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <>
      <Pie data={allData} />
    </>
  );
};

export default PieChart;
