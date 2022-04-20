import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import OneBlock from "./OneBlock";

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
  WorkingStations: Array<oneBlock>;
};

const GeneralBlock = (props: IProps) => {
  const { accessToken, selectedUnit } = props;
  const [errorText, setErrorText] = useState(" ");
  const [allStations, setAllStations] = useState<Array<oneBlock>>();

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
        // const dataIn = data.WorkingStations
        //  );
        // console.log(data.WorkingStations);
        setAllStations(data.WorkingStations);
      },
    }
  );

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      {allStations &&
        allStations.map((data, index) => {
          return (
            <Grid item xs={4} key={data.id}>
              <OneBlock
                key={data.id}
                location={data.location}
                devices={data.devices}
              />
            </Grid>
          );
        })}
    </>
  );
};

export default GeneralBlock;
