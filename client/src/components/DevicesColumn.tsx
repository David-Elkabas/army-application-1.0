import { Avatar, Box, Grid, Tooltip, Typography } from "@mui/material";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import CCTAvatar from "../images/images-generalBlock/CCT2.png";
import RCGWAvatar from "../images/images-generalBlock/RCGW.png";
import YadbarAvatar from "../images/images-generalBlock/yadbar.png";
import DeployAvatar from "../images/images-generalBlock/deploy2.png";
import CCUAvatar from "../images/images-generalBlock/CCU.png";

type IProps = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const deviceToIcon = {
  CCT: CCTAvatar,
  RCGW: RCGWAvatar,
  Yadbar: YadbarAvatar,
  Deploy: DeployAvatar,
  CCU: CCUAvatar,
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
  // console.log(device);

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
        }
        arrow
        sx={{ fontSize: 10 }}
      >
        <Grid container justifyContent="space-between">
          <Grid item xs={3} sx={{ ml: 1 }}>
            <Avatar
              alt={device}
              src={deviceToIcon[device] ? deviceToIcon[device] : RCGWAvatar}
              variant="rounded"
            />
          </Grid>
          {/* <Grid item xs={1} sx={{ mt: 0.6 }}>
            <Typography variant="body1" component="div" color="white">
              {OK + ERROR + FAILED}
            </Typography>
          </Grid> */}
          <Grid item xs={8} sx={{ mt: 1, mr: 1 }}>
            <ProgressBar>
              <ProgressBar
                style={{ backgroundColor: "#52c234" }}
                now={okPercent}
                label={OK}
                key={1}
              />
              <ProgressBar
                style={{ backgroundColor: "rgba(255, 159, 64, 1)" }}
                now={errorPercent}
                label={ERROR}
                key={2}
              />
              <ProgressBar
                style={{ backgroundColor: "rgba(255, 99, 132, 1)" }}
                // variant="danger"
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
