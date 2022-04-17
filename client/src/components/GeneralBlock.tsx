import React, { useState } from "react";
import { useQuery } from "react-query";

type IProps = {
  accessToken: string;
  selectedUnit: string;
};
type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

type oneBlock = {
  id: number;
  location: string;
  devices: Array<oneDevice>;
};

type DataBlocks = {
  stations: Array<oneBlock>;
};

const GeneralBlock = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [allStations, setAllStations] = useState<DataBlocks | undefined>();

  const fetchDataBlocks = async (): Promise<any> => {
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

  const { data, isLoading, isError } = useQuery<DataBlocks>(
    "WorkingStations",
    fetchDataBlocks,
    {
      onSuccess: (data) => {
        //  const statesArray: Array<string> = data?.stations.map(

        //  );
        console.log(data);
        // setAllStations(data.stations);
      },
    }
  );
  //    const {
  //      dataStateArray: RcgwDataStateArray,
  //      dataNumberArray: RcgwDataNumberArray,
  //      chartTitle: RcgwChartTitle,
  //    } = RcgwDataArrays;

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return <>hello</>;
};

export default GeneralBlock;
