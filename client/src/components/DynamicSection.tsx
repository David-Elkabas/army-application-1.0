import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";

import { useState } from "react";
import { useQuery } from "react-query";
import MultiCheckBoxSelect from "./MultiCheckBoxSelect";

type IProps = { accessToken: string; selectedUnit: string };

type dataParam = {
  id: number;
  location: string;
  network: string | null;
  status: Status;
};

type Status = {
  OK: number;
  ERROR: number;
  FAILED: number;
};

const DynamicSection = (props: IProps) => {
  const { accessToken, selectedUnit } = props;

  const [errorText, setErrorText] = useState(" ");
  const [locations, setLocations] = useState<Array<string>>([]);
  const [stationsData, setStationsData] = useState<Array<dataParam>>([]);

  const fetchChartsData = async (): Promise<any> => {
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

  const { data, isLoading, isError } = useQuery<any>(
    "LocationCharts",
    fetchChartsData,
    {
      onSuccess: (data) => {
        const locationsArray: Array<string> = data?.LocationBasedChart.map(
          (loc: dataParam) => {
            if (data) {
              return loc.location;
            } else return "";
          }
        );
        // console.log(data);

        setStationsData(data?.LocationBasedChart);
        // const numbersArray: Array<number> = data?.RcgwChartData.map(
        //   (machine: dataParam) => {
        //     if (data) {
        //       return machine.number;
        //     } else return 0;
        //   }
        // );
        setLocations(locationsArray);
      },
    }
  );
  if (isLoading) return <>"Loading..."</>;

  if (isError) return <>"An error has occurred: " {errorText}</>;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {/* {stationsData &&
            stationsData.map((ele) => {
              return ele.location;
            })} */}
          <MultiCheckBoxSelect stationsData={stationsData} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" endIcon={<AddIcon />}>
            הוסף
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default DynamicSection;
