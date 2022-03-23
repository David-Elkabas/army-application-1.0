import React, { useState } from "react";
import { useQuery } from "react-query";
import StackedBarChart from "./StackedBarChart";

type IProps = {
  accessToken: string;
  selectedUnit: string;
};
type dataParam = {
  id: number;
  status: string;
  number: number;
};
type BarDataParam = {
  id: number;
  network: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};
type arrayOfDataParam = {
  RCGWChartData: Array<dataParam>;
  MakmashimChartData: Array<dataParam>;
  NetworkChartData: Array<BarDataParam>;
};
type RcgwDataObject = {
  dataStateArray: Array<string>;
  okNumberArray: Array<number>;
  failedNumberArray: Array<number>;
  errorNumberArray: Array<number>;
  chartTitle: string;
};

const NetWorkChart = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [BarDataArrays, setBarDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    okNumberArray: [],
    failedNumberArray: [],
    errorNumberArray: [],
    chartTitle: " ",
  });

  const fetchChartsData = async (): Promise<arrayOfDataParam> => {
    const res = await fetch(
      `http://localhost:5005/api/charts/rcgw-chart-data/${selectedUnit}`,
      {
        headers: { authorization: "Bearer " + accessToken },
      }
    );
    if (!res.ok) {
      console.log("error at fetching rcgw-chart-data");
      setErrorText(
        `status code: ${res.status} status text: ${res.statusText} url: ${res.url}`
      );
      throw new Error("Problem fetching data");
    }
    return res.json();
  };

  const { data, isLoading, isError } = useQuery<arrayOfDataParam>(
    "BarChartData",
    fetchChartsData,
    {
      onSuccess: (data) => {
        const statesArray: Array<string> = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return machine.network;
            } else return "";
          }
        );
        const okNumbersArray: Array<number> = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return machine.OK;
            } else return 0;
          }
        );
        const failedNumbersArray: Array<number> = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return machine.FAILED;
            } else return 0;
          }
        );
        const errorNumbersArray: Array<number> = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return machine.ERROR;
            } else return 0;
          }
        );
        setBarDataStateArray({
          dataStateArray: statesArray,
          okNumberArray: okNumbersArray,
          failedNumberArray: failedNumbersArray,
          errorNumberArray: errorNumbersArray,
          chartTitle: `רשתות מול מקמ"שים`,
        });
      },
    }
  );

  const {
    dataStateArray,
    okNumberArray,
    failedNumberArray,
    errorNumberArray,
    chartTitle,
  } = BarDataArrays;

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <StackedBarChart
        labels={dataStateArray}
        dataOK={okNumberArray}
        dataFAILED={failedNumberArray}
        dataERROR={errorNumberArray}
        chartTitle={chartTitle}
      />
    </>
  );
};

export default NetWorkChart;
