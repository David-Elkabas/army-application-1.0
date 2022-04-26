import { Box, Chip, Grid } from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
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
  const [allStations, setAllStations] = useState<Array<oneBlock>>([]);
  // const [stationsToShow, setStationsToShow] = useState<Array<oneBlock>>([]);
  const [selectedStations, setSelectedStations] = useState<Array<oneBlock>>([]);

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
        // setAllStations(data.WorkingStations);
        setAllStations((prevState: Array<oneBlock>) => {
          let tempStationsArray: Array<oneBlock> = [];
          for (let station of data.WorkingStations) {
            if (
              prevState?.find((location: any) => location === station.location)
            ) {
              tempStationsArray.push(station);
            } else if (
              selectedStations?.find((loc) => loc.location === station.location)
            ) {
              console.log(selectedStations);
            } else {
              tempStationsArray.push(station);
            }
          }
          return tempStationsArray;
        });
      },
    }
  );

  const clickOnShownStation = (station: oneBlock) => {
    setSelectedStations([...selectedStations, station]);
    setAllStations(
      allStations.filter((loc) => loc.location !== station.location)
    );
  };

  const clickOnSelectedStation = (station: oneBlock) => {
    setAllStations([station, ...allStations]);
    setSelectedStations(
      selectedStations.filter((loc) => loc.location !== station.location)
    );
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Grid item xs={12}>
        <Box sx={{ m: 1 }}>
          {allStations &&
            allStations.map((station, index) => {
              return (
                <Chip
                  key={index}
                  label={station.location}
                  // variant="outlined"
                  sx={{
                    my: 1,
                    mr: 0.5,
                    backgroundColor: "#93B0B0",
                    fontWeight: "bold",
                  }}
                  clickable
                  onClick={() => clickOnShownStation(station)}
                />
              );
            })}
          {selectedStations &&
            selectedStations.map((station, index) => {
              return (
                <Chip
                  key={index}
                  label={station.location}
                  sx={{
                    my: 1,
                    mr: 0.5,
                    backgroundColor: "#0d292a",
                    fontWeight: "bold",
                    color: "white",
                  }}
                  clickable
                  onClick={() => clickOnSelectedStation(station)}
                />
              );
            })}
        </Box>
      </Grid>

      {allStations &&
        allStations.map((data, index) => {
          return (
            <Grid item xs={2} key={data.id}>
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
