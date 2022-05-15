import { Avatar, Box, Grid, Radio, Tooltip, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import CCTAvatar from "../images/images-generalBlock/CCT2.png";
import RCGWAvatar from "../images/images-generalBlock/RCGW.png";
import YadbarAvatar from "../images/images-generalBlock/yadbar.png";
import DeployAvatar from "../images/images-generalBlock/deploy2.png";
import CCUAvatar from "../images/images-generalBlock/CCU.png";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeviceTooltip from "./DeviceTooltip";
import CustomProgressBar from "./CustomProgressBar";
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

const DeviceColumnNoStar = (props: IProps) => {
  const { device, OK, ERROR, FAILED } = props;
  const { okPercent, errorPercent, failPercent } = percentCalculator(
    OK,
    ERROR,
    FAILED
  );

  const arrayOfPercents = [okPercent, errorPercent, failPercent];
  const arrayOfLabel = [OK, ERROR, FAILED];

  return (
    <>
      <Tooltip
        followCursor
        title={
          <DeviceTooltip
            device={device}
            OK={OK}
            ERROR={ERROR}
            FAILED={FAILED}
          />
        }
        arrow
        sx={{ fontSize: 10 }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={2.5}>
            <Avatar
              alt={device}
              src={deviceToIcon[device] ? deviceToIcon[device] : RCGWAvatar}
              variant="rounded"
            />
          </Grid>

          <Grid item xs={7} sx={{ mt: 1.5, mr: 1 }}>
            <CustomProgressBar
              percents={arrayOfPercents}
              labels={arrayOfLabel}
            />
          </Grid>
        </Grid>
      </Tooltip>
    </>
  );
};

export default DeviceColumnNoStar;
