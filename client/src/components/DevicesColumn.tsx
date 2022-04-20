import { Box, Grid, Tooltip, Typography } from "@mui/material";
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
      <Tooltip
        followCursor
        title={
          <>
            <Typography fontSize={20} align="left">
              {device} :שם רכיב
            </Typography>
            <Typography fontSize={20} align="left">
              {OK} :מספר רכיבים תקינים
            </Typography>
            <Typography fontSize={20} align="left">
              {ERROR} :מספר רכיבים תקולים
            </Typography>
            <Typography fontSize={20} align="left">
              {FAILED} :מספר רכיבים לא עובדים
            </Typography>
          </>
          //   {ERROR} {FAILED}
        }
        arrow
        //   placement={index % 2 === 0 ? "right" : "left"}
        sx={{ fontSize: 10 }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={5} sx={{ ml: 1 }}>
            <Typography variant="h6" component="div" color="white">
              {device}
            </Typography>
          </Grid>
          <Grid item xs={1} sx={{ mt: 0.6 }}>
            <Typography variant="body1" component="div" color="white">
              {OK + ERROR + FAILED}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ mt: 1, mr: 1, ml: -5 }}>
            <ProgressBar>
              <ProgressBar
                variant="success"
                now={okPercent}
                label={OK}
                key={1}
              />
              <ProgressBar
                variant="warning"
                now={errorPercent}
                label={ERROR}
                key={2}
              />
              <ProgressBar
                variant="danger"
                now={failPercent}
                label={FAILED}
                key={3}
              />
            </ProgressBar>
            {/* <Typography variant="h6" component="div" color="white">
          {OK} {ERROR} {FAILED}
        </Typography> */}
          </Grid>
        </Grid>
      </Tooltip>
    </>
  );
};

export default DevicesColumn;
