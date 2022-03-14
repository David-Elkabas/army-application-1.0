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

const PieCharts = (props: IProps) => {
  const { accessToken } = props;
  const [errorText, setErrorText] = useState(" ");
  const [dataStateArray, setDataStateArray] = useState<string[]>([]);
  const [dataNumberArray, setDataNumberArray] = useState<number[]>([]);

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
        // console.log(`the data is ${data.RCGWChartData}`);
        const statesArray: Array<string> = data?.RCGWChartData.map(
          (machine: dataParam) => {
            // console.log(machine);
            if (data) {
              return machine.status;
            } else return "";
          }
        );
        const numbersArray: Array<number> = data?.RCGWChartData.map(
          (machine: dataParam) => {
            // console.log(machine);
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setDataStateArray(statesArray);
        setDataNumberArray(numbersArray);
      },
    }
  );

  //   const { RCGWChartData } = data ?? {
  //     RCGWChartData: [],
  //   };

  //   const numbersArray: Array<string> = data?.RCGWChartData.map(
  //     (machine: dataParam) => {
  //       console.log(machine);
  //       return {};
  //       // return { [...statesArray, machine.status], [...numbersArray, machine.number] };
  //     }
  //   );
  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return <PieChart labels={dataStateArray} data={dataNumberArray} />;
};

export default PieCharts;
