import { Typography } from "@mui/material";
import React from "react";

type IProps = {
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const DeviceTooltip: React.FC<IProps> = (props: IProps) => {
  const { device, OK, ERROR, FAILED } = props;
  return (
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
  );
};

export default DeviceTooltip;
