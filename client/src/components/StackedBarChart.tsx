import React from "react";
import { Bar } from "react-chartjs-2";

type IProps = {
  labels: Array<string>;
  dataOK: Array<number>;
  dataFAILED: Array<number>;
  dataERROR: Array<number>;
  chartTitle: string;
};

const StackedBarChart = (props: IProps) => {
  const { labels, dataOK, dataFAILED, dataERROR, chartTitle } = props;

  const data = {
    labels,
    datasets: [
      {
        label: "OK",
        data: dataOK,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "FAILED",
        data: dataFAILED,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "ERROR",
        data: dataERROR,
        backgroundColor: "rgba(255, 159, 64, 0.5)",
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        font: {
          size: 20,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return <Bar options={options} data={data} />;
};

export default StackedBarChart;
