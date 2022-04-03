import { Chip } from "@mui/material";
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
  // dataStateArray: Array<string>;
  labelArray: Array<string>;
  selectedlArray: Array<string>;
  okNumberArray: Array<number>;
  failedNumberArray: Array<number>;
  errorNumberArray: Array<number>;
  chartTitle: string;
};
type ChipSelector = {
  labelArray: Array<string>;
  selectedlArray: Array<string>;
};

const NetWorkChart = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [chipSelector, setChipSelector] = useState<ChipSelector>({
    labelArray: [],
    selectedlArray: [],
  });
  const [BarDataArrays, setBarDataStateArray] = useState<RcgwDataObject>({
    labelArray: [],
    selectedlArray: [],
    // dataStateArray: [],
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
        const allData: any = data?.NetworkChartData.map(
          (machine: BarDataParam) => {
            if (data) {
              return [
                machine.network,
                machine.OK,
                machine.FAILED,
                machine.ERROR,
              ];
            } else return [" ", 0, 0, 0];
          }
        );

        const statesArray = allData.map((element: any) => {
          return element[0];
        });
        const okNumbersArray = allData.map((element: any) => {
          return element[1];
        });
        const failedNumbersArray = allData.map((element: any) => {
          return element[2];
        });
        const errorNumbersArray = allData.map((element: any) => {
          return element[3];
        });

        // setChipSelector({
        //   labelArray: statesArray,
        //   selectedlArray: [...selectedlArray],
        // });

        setBarDataStateArray({
          labelArray: statesArray,
          selectedlArray: [...BarDataArrays.selectedlArray],
          // dataStateArray: statesArray,
          okNumberArray: okNumbersArray,
          failedNumberArray: failedNumbersArray,
          errorNumberArray: errorNumbersArray,
          chartTitle: `רשתות מול מקמ"שים`,
        });
      },
    }
  );

  const {
    labelArray,
    selectedlArray,
    // dataStateArray,
    okNumberArray,
    failedNumberArray,
    errorNumberArray,
    chartTitle,
  } = BarDataArrays;

  const clickOnLabelArray = (label: string) => {
    setBarDataStateArray({
      labelArray: BarDataArrays.labelArray.filter(
        (labelInArray) => labelInArray !== label
      ),
      selectedlArray: [label, ...BarDataArrays.selectedlArray],
      okNumberArray: [...BarDataArrays.okNumberArray],
      failedNumberArray: [...BarDataArrays.failedNumberArray],
      errorNumberArray: [...BarDataArrays.errorNumberArray],
      chartTitle: `רשתות מול מקמ"שים`,
    });
  };

  const clickOnSelectedArray = (label: string) => {
    setBarDataStateArray({
      labelArray: [label, ...BarDataArrays.labelArray],
      selectedlArray: chipSelector.selectedlArray.filter(
        (labelInArray) => labelInArray !== label
      ),
      okNumberArray: [...BarDataArrays.okNumberArray],
      failedNumberArray: [...BarDataArrays.failedNumberArray],
      errorNumberArray: [...BarDataArrays.errorNumberArray],
      chartTitle: `רשתות מול מקמ"שים`,
    });
    // TODO ---- connect the Chips to CHARTBAR
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      {labelArray &&
        labelArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="primary"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnLabelArray(data)}
            />
          );
        })}
      {selectedlArray &&
        selectedlArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="error"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnSelectedArray(data)}
            />
          );
        })}
      <StackedBarChart
        labels={labelArray}
        dataOK={okNumberArray}
        dataFAILED={failedNumberArray}
        dataERROR={errorNumberArray}
        chartTitle={chartTitle}
      />
    </>
  );
};

export default NetWorkChart;
