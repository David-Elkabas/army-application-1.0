import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import DevicesColumn from "./DevicesColumn";

type oneDevice = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

interface IProps {
  location: string;
  devices: Array<oneDevice>;
}
const OneBlock = (props: IProps) => {
  const { location, devices } = props;

  return (
    <Card sx={{ minWidth: 275, backgroundColor: "#0d292a", margin: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div" color="white">
          מיקום: {location}
        </Typography>
        {devices &&
          devices.map((device, index) => {
            return (
              <Grid item xs={12} key={index}>
                <DevicesColumn
                  key={index}
                  device={device.device}
                  OK={device.OK}
                  ERROR={device.ERROR}
                  FAILED={device.FAILED}
                />
              </Grid>
            );
          })}
        {/* <Typography sx={{ m: 1.5 }} color="white">
          helo
        </Typography> */}
      </CardContent>
    </Card>
  );
};

export default OneBlock;
