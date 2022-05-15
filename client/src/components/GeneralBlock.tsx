import { Box, Chip, Grid } from "@mui/material";
import React, { useState } from "react";
import Draggable from "react-draggable";
import { useQuery } from "react-query";
import OneBlock from "./OneBlock";

type IProps = {
  accessToken: string;
  selectedUnit: string;
  favoriteStations: Array<DevicePerems>;
  setFavoriteStations: React.Dispatch<React.SetStateAction<DevicePerems[]>>;
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
  type: string;
  devices: Array<oneDevice>;
};

type DataBlocks = {
  WorkingStations: Array<oneBlock>;
};

type DevicePerems = {
  location: string;
  type: string;
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

// const colorToType = {
//   שרתים: "#172e0b",
//   "אתרי תקשוב": "#073763",
//   'תק"שי רדיו': "	#5c1010",
//   'פת"ל': "#7f6000",
//   קידמית: "#5d2844",
//   קרונות: "#291762",
//   אחר: "#F9E4D4",
// };

const colorToType = {
  שרתים: "linear-gradient(to bottom right, #000600, #44a08d)",
  "אתרי תקשוב": "linear-gradient(to bottom right, #000428, #004e92)",
  'תק"שי רדיו': "linear-gradient(to bottom right, #200122, #6f0000);",
  'פת"ל': "linear-gradient(to bottom right, #061700, #52c234)",
  קידמית: "linear-gradient(to bottom right,#060600, #ff8008)",
  קרונות: "linear-gradient(to bottom right, #000005, #6441a5)",
  אחר: "linear-gradient(to right, #2b5876, #4e4376);",
};

const colorSelector = (area) => {
  if (area in colorToType) {
    return colorToType[area];
  } else {
    return "#464E2E";
  }
};

const GeneralBlock = (props: IProps) => {
  const { accessToken, selectedUnit, favoriteStations, setFavoriteStations } =
    props;
  const [errorText, setErrorText] = useState(" ");

  const [stationType, setStationType] = useState<string[]>([]);
  const [selectedStationType, setSelectedStationType] = useState<string[]>([]);

  const [allStations, setAllStations] = useState<Array<oneBlock>>([]);
  const [selectedStations, setSelectedStations] = useState<Array<oneBlock>>([]);

  const fetchDataBlocks = async (): Promise<any> => {
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

  const { data, isLoading, isError } = useQuery<DataBlocks>(
    "WorkingStations",
    fetchDataBlocks,
    {
      onSuccess: (data) => {
        let tempArr = [""];
        for (let i = 0; i < data.WorkingStations.length; i++) {
          if (!tempArr.includes(data.WorkingStations[i].type)) {
            tempArr.push(data.WorkingStations[i].type);
          }
        }
        tempArr.shift();

        setStationType((prevState: string[]) => {
          let tempAreaArray: string[] = [];
          for (let area of tempArr) {
            if (prevState?.find((loc: any) => loc === area)) {
              tempAreaArray.push(area);
            } else if (selectedStationType?.find((loc) => loc === area)) {
            } else {
              tempAreaArray.push(area);
            }
          }
          return tempAreaArray;
        });

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
              // console.log(selectedStations);
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

  const clickOnShownArea = (area: string) => {
    setSelectedStationType([area, ...selectedStationType]);
    setStationType(stationType.filter((loc) => loc !== area));
    setAllStations(allStations.filter((loc) => loc.type !== area));

    let tempArray: any = [];
    tempArray = allStations.filter((loc) => loc.type === area);
    // console.log(tempArray);
    setSelectedStations([...selectedStations, ...tempArray]);
  };

  const clickOnSelectedShownArea = (area: string) => {
    setStationType([area, ...stationType]);

    let tempArray: any = [];
    tempArray = selectedStations.filter((loc) => loc.type === area);
    setAllStations([...tempArray, ...allStations]);

    setSelectedStationType(selectedStationType.filter((loc) => loc !== area));
    setSelectedStations(selectedStations.filter((loc) => loc.type !== area));
  };

  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Grid item>
        <Box sx={{ m: 1 }}>
          {stationType &&
            stationType.map((area, index) => {
              return (
                <Chip
                  key={index}
                  label={area}
                  // variant="outlined"
                  sx={{
                    mt: 1,
                    mr: 0.5,
                    p: 2,
                    border: 2,
                    background: () => colorSelector(area),
                    fontWeight: "bold",
                    color: "white",
                  }}
                  clickable
                  onClick={() => clickOnShownArea(area)}
                />
              );
            })}
          {selectedStationType &&
            selectedStationType.map((area, index) => {
              return (
                <Chip
                  key={index}
                  label={area}
                  variant="outlined"
                  sx={{
                    mt: 1,
                    mr: 0.5,
                    p: 2,
                    border: 2,

                    // backgroundColor: "black",
                    // color: "white",
                    fontWeight: "bold",
                  }}
                  clickable
                  onClick={() => clickOnSelectedShownArea(area)}
                />
              );
            })}
        </Box>
      </Grid>
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
                    mb: 1,
                    mr: 0.5,

                    background: () => colorSelector(station.type),
                    fontWeight: "bold",
                    color: "white",
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
                  variant="outlined"
                  sx={{
                    mb: 1,
                    mr: 0.5,
                    border: 2,
                    fontWeight: "bold",
                  }}
                  clickable
                  onClick={() => clickOnSelectedStation(station)}
                />
              );
            })}
        </Box>
      </Grid>

      <Grid container direction="row">
        {allStations &&
          allStations.map((data, index) => {
            return (
              <Grid item xs={2.4} key={data.id}>
                <OneBlock
                  key={data.id}
                  location={data.location}
                  devices={data.devices}
                  color={() => colorSelector(data.type)}
                  favoriteStations={favoriteStations}
                  deviceType={data.type}
                  setFavoriteStations={setFavoriteStations}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default GeneralBlock;
