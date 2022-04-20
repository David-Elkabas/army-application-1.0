import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ProgressBar } from "react-bootstrap";

type IProps = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const percentCalculator = (
  okNum: number,
  errorNum: number,
  failNum: number
) => {
  const sum = okNum + errorNum + failNum;
  const eachNum = 100 / sum;

  const okPercent = okNum * eachNum;
  const errorPercent = errorNum * eachNum;
  const failPercent = failNum * eachNum;

  return { okPercent, errorPercent, failPercent };
};

const DevicesColumn = (props: IProps) => {
  const { device, OK, ERROR, FAILED } = props;

  const { okPercent, errorPercent, failPercent } = percentCalculator(
    OK,
    ERROR,
    FAILED
  );
  return (
    <>
      <Box sx={{ maxWidth: 50 }}></Box>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h6" component="div" color="white">
            {device}
          </Typography>
        </Grid>
        <Grid item xs={5} sx={{ mt: 1, mr: 1 }}>
          <ProgressBar>
            <ProgressBar variant="success" now={okPercent} key={1} />
            <ProgressBar variant="warning" now={errorPercent} key={2} />
            <ProgressBar variant="danger" now={failPercent} key={3} />
          </ProgressBar>
          {/* <Typography variant="h6" component="div" color="white">
          {OK} {ERROR} {FAILED}
        </Typography> */}
        </Grid>
      </Grid>
    </>
    // <Typography variant="h6" component="div" color="white">

    //   {device} {OK} {ERROR} {FAILED}
    // </Typography>
  );
};

export default DevicesColumn;
