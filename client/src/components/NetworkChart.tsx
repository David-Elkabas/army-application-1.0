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
  dataStateArray: Array<string>;
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
        // console.log(`statesArray: ${statesArray}`);
        // console.log(`okNumberArray: ${okNumberArray}`);
        // console.log(`failedNumberArray: ${failedNumberArray}`);
        // console.log(`errorNumberArray: ${errorNumberArray}`);

        setChipSelector({
          labelArray: statesArray,
          selectedlArray: [],
        });
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

  const clickOnLabelArray = (label: string) => {
    setChipSelector({
      labelArray: chipSelector.labelArray.filter(
        (labelInArray) => labelInArray !== label
      ),
      selectedlArray: [label, ...chipSelector.selectedlArray],
    });
  };

  const clickOnSelectedArray = (label: string) => {
    setChipSelector({
      labelArray: [label, ...chipSelector.labelArray],
      selectedlArray: chipSelector.selectedlArray.filter(
        (labelInArray) => labelInArray !== label
      ),
    });

    // setGenres({
    //   genresArray: [genre, ...genres.genresArray],
    //   selectedGenres: genres.selectedGenres.filter((g) => g.id !== genre.id),
    // });
    // setPage(1);
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      {chipSelector.labelArray &&
        chipSelector.labelArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="primary"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnLabelArray(data)}
              // onDelete={() => clickOnSelectedGenres(data)}
            />
          );
        })}
      {chipSelector.selectedlArray &&
        chipSelector.selectedlArray.map((data, index) => {
          return (
            <Chip
              key={index}
              label={data}
              color="error"
              sx={{ margin: "3px" }}
              clickable
              onClick={() => clickOnSelectedArray(data)}
              // onDelete={() => clickOnSelectedGenres(data)}
            />
          );
        })}
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
