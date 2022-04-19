import { Grid, Typography } from "@mui/material";
import React from "react";

type IProps = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const DevicesColumn = (props: IProps) => {
  const { device, OK, ERROR, FAILED } = props;
  return (
    <Grid container justifyContent="space-around">
      <Grid item>
        <Typography variant="h6" component="div" color="white">
          {device}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" component="div" color="white">
          {OK} {ERROR} {FAILED}
        </Typography>
      </Grid>
    </Grid>
    // <Typography variant="h6" component="div" color="white">

    //   {device} {OK} {ERROR} {FAILED}
    // </Typography>
  );
};

export default DevicesColumn;
