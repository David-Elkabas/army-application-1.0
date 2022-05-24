import { Grid } from "@mui/material";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import PieChart from "./PieChart";

type IProps = {
  accessToken: string;
  selectedUnit: string;
};
type dataParam = {
  id: number;
  state: string;
  number: number;
};
type arrayOfDataParam = {
  RcgwChartData: Array<dataParam>;
  MakmashimChartData: Array<dataParam>;
  CCUChartData: Array<dataParam>;
  CCTChartData: Array<dataParam>;
  YadbarChartData: Array<dataParam>;
  SoftwareDistributionServerChartData: Array<dataParam>;
};
type RcgwDataObject = {
  dataStateArray: Array<string>;
  dataNumberArray: Array<number>;
  chartTitle: string;
};

const PieCharts = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
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
  const [CCUDataArrays, setCCUDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });
  const [CCTDataArrays, setCCTDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });
  const [YadbarDataArrays, setYadbarDataStateArray] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });
  const [
    SoftwareDistributionServerDataArrays,
    setSoftwareDistributionServerDataStateArray,
  ] = useState<RcgwDataObject>({
    dataStateArray: [],
    dataNumberArray: [],
    chartTitle: " ",
  });

  const fetchChartsData = async (): Promise<arrayOfDataParam> => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/charts/rcgw-chart-data/${selectedUnit}`,
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
        const statesArray: Array<string> = data?.RcgwChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const numbersArray: Array<number> = data?.RcgwChartData.map(
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
              return machine.state;
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
        const CCUStatesArray: Array<string> = data?.CCUChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const CCUNumbersArray: Array<number> = data?.CCUChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setCCUDataStateArray({
          dataStateArray: CCUStatesArray,
          dataNumberArray: CCUNumbersArray,
          chartTitle: `CCU`,
        });
        const CCTStatesArray: Array<string> = data?.CCTChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const CCTNumbersArray: Array<number> = data?.CCTChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setCCTDataStateArray({
          dataStateArray: CCTStatesArray,
          dataNumberArray: CCTNumbersArray,
          chartTitle: `CCT`,
        });
        const YadbarStatesArray: Array<string> = data?.YadbarChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.state;
            } else return "";
          }
        );
        const YadbarNumbersArray: Array<number> = data?.YadbarChartData.map(
          (machine: dataParam) => {
            if (data) {
              return machine.number;
            } else return 0;
          }
        );
        setYadbarDataStateArray({
          dataStateArray: YadbarStatesArray,
          dataNumberArray: YadbarNumbersArray,
          chartTitle: `ידב"רים`,
        });
        const SoftwareDistributionServerStatesArray: Array<string> =
          data?.SoftwareDistributionServerChartData.map(
            (machine: dataParam) => {
              if (data) {
                return machine.state;
              } else return "";
            }
          );
        const SoftwareDistributionServerNumbersArray: Array<number> =
          data?.SoftwareDistributionServerChartData.map(
            (machine: dataParam) => {
              if (data) {
                return machine.number;
              } else return 0;
            }
          );
        setSoftwareDistributionServerDataStateArray({
          dataStateArray: SoftwareDistributionServerStatesArray,
          dataNumberArray: SoftwareDistributionServerNumbersArray,
          chartTitle: `שרת הפצה`,
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
  const {
    dataStateArray: CCUDataArray,
    dataNumberArray: CCUNumberArray,
    chartTitle: CCUChartTitle,
  } = CCUDataArrays;
  const {
    dataStateArray: CCTDataArray,
    dataNumberArray: CCTNumberArray,
    chartTitle: CCTChartTitle,
  } = CCTDataArrays;
  const {
    dataStateArray: YadbarDataArray,
    dataNumberArray: YadbarNumberArray,
    chartTitle: YadbarChartTitle,
  } = YadbarDataArrays;
  const {
    dataStateArray: SoftwareDistributionServerDataArray,
    dataNumberArray: SoftwareDistributionServerNumberArray,
    chartTitle: SoftwareDistributionServerChartTitle,
  } = SoftwareDistributionServerDataArrays;

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={RcgwDataStateArray}
          data={RcgwDataNumberArray}
          chartTitle={RcgwChartTitle}
        />
      </Grid>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={MakmashimDataArray}
          data={MakmashimNumberArray}
          chartTitle={MakmashimChartTitle}
        />
      </Grid>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={CCUDataArray}
          data={CCUNumberArray}
          chartTitle={CCUChartTitle}
        />
      </Grid>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={CCTDataArray}
          data={CCTNumberArray}
          chartTitle={CCTChartTitle}
        />
      </Grid>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={YadbarDataArray}
          data={YadbarNumberArray}
          chartTitle={YadbarChartTitle}
        />
      </Grid>
      <Grid item xs={4} sx={{ width: "14vw" }}>
        <PieChart
          labels={SoftwareDistributionServerDataArray}
          data={SoftwareDistributionServerNumberArray}
          chartTitle={SoftwareDistributionServerChartTitle}
        />
      </Grid>
    </>
  );
};

export default PieCharts;
