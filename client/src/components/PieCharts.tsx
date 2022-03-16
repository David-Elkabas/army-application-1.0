import { Grid } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PieChart from "./PieChart";

type IProps = {
  accessToken: string;
};
type dataParam = {
  id: number;
  status: string;
  number: number;
};
type arrayOfDataParam = {
  RCGWChartData: Array<dataParam>;
  MakmashimChartData: Array<dataParam>;
};
type RcgwDataObject = {
  dataStateArray: Array<string>;
  dataNumberArray: Array<number>;
  chartTitle: string;
};

const PieCharts = (props: IProps) => {
  const { accessToken } = props;
  const [errorText, setErrorText] = useState(" ");
  const [RcgwDataArrays, setRcgwDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });
  const [MakmashimDataArrays, setMakmashimDataStateArray] =
    useState<RcgwDataObject>({
      dataStateArray: [],
      dataNumberArray: [],
      chartTitle: " ",
    });

  const fetchChartsData = async (): Promise<arrayOfDataParam> => {
    const res = await fetch(
      "http://localhost:5005/api/charts/rcgw-chart-data",
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
    "rcgwChartData",
    fetchChartsData,
    {
      onSuccess: (data) => {
        const statesArray: Array<string> = data?.RCGWChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.status;
            } else return "";
          }
        );
        const numbersArray: Array<number> = data?.RCGWChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setRcgwDataStateArray({
          dataStateArray: statesArray,
          dataNumberArray: numbersArray,
          chartTitle: `ישלק"ים`,
        });
        const MakmashimStatesArray: Array<string> =
          data?.MakmashimChartData.map((machine: dataParam) => {
            if (data) {
              return machine.status;
            } else return "";
          });
        const MakmashimNumbersArray: Array<number> =
          data?.MakmashimChartData.map((machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          });
        setMakmashimDataStateArray({
          dataStateArray: MakmashimStatesArray,
          dataNumberArray: MakmashimNumbersArray,
          chartTitle: `מקמ"שים`,
        });
      },
    }
  );
  const {
    dataStateArray: RcgwDataStateArray,
    dataNumberArray: RcgwDataNumberArray,
    chartTitle: RcgwChartTitle,
  } = RcgwDataArrays;
  const {
    dataStateArray: MakmashimDataArray,
    dataNumberArray: MakmashimNumberArray,
    chartTitle: MakmashimChartTitle,
  } = MakmashimDataArrays;
  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Grid item xs={6} sx={{ width: "14vw" }}>
        <PieChart
          labels={RcgwDataStateArray}
          data={RcgwDataNumberArray}
          chartTitle={RcgwChartTitle}
        />
      </Grid>
      <Grid item xs={6} sx={{ width: "14vw" }}>
        <PieChart
          labels={MakmashimDataArray}
          data={MakmashimNumberArray}
          chartTitle={MakmashimChartTitle}
        />
      </Grid>
    </>
  );
};

export default PieCharts;
