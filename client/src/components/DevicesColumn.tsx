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
  const [isSelected, setIsSelected] = useState(false);
  const { okPercent, errorPercent, failPercent } = percentCalculator(
    OK,
    ERROR,
    FAILED
  );

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  // console.log(device);
  const handleChange = () => {
    setIsSelected(!isSelected);
    console.log(isSelected);
  };
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
        <Grid container justifyContent="center">
          <Grid item xs={2}>
            <Checkbox
              {...label}
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
              sx={{
                "&.Mui-checked": {
                  color: "#f5c71a",
                },
              }}
            />
          </Grid>
          <Grid item xs={2.5}>
            <Avatar
              alt={device}
              src={deviceToIcon[device] ? deviceToIcon[device] : RCGWAvatar}
              variant="rounded"
            />
          </Grid>

          <Grid item xs={7} sx={{ mt: 1.5, mr: 1 }}>
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
          </Grid>
        </Grid>
      </Tooltip>
    </>
  );
};

export default DevicesColumn;
