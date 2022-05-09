import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import Draggable from "react-draggable";
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
  color: any;
}
const OneBlock = (props: IProps) => {
  const { location, devices, color } = props;

  return (
    <Draggable>
      <Card
        style={{ cursor: "move" }}
        sx={{
          borderRadius: 3,
          backgroundColor: color,
          my: 2,
          mr: 2,
          justifyContent: "top",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" color="white">
            {location}
          </Typography>
          {devices &&
            devices.map((device, index) => {
              return (
                <Paper sx={{ bgcolor: "#93B0B0", m: 1 }}>
                  <Grid item xs={12} key={index}>
                    <DevicesColumn
                      key={index}
                      device={device.device}
                      OK={device.OK}
                      ERROR={device.ERROR}
                      FAILED={device.FAILED}
                    />
                  </Grid>
                </Paper>
              );
            })}
          {/* <Typography sx={{ m: 1.5 }} color="white">
          helo
        </Typography> */}
        </CardContent>
      </Card>
    </Draggable>
  );
};

export default OneBlock;
