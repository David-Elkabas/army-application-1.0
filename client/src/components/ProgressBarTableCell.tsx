import { Box, Grid } from "@mui/material";
import * as React from "react";

interface ProgressBarProps {
  value: number;
}

const selectColor = (number) => {
  if (number < 50) return "#c5e0b4";
  else if (number >= 50 && number <= 85) return "#ffe699";
  else return "#ee756c";
};

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  // console.log(value);
  const onlyValue = Number(value.toString().replace("%", ""));

  return (
    <Grid
      container
      style={{
        border: "2px solid black",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 26,
        borderRadius: 5,
        margin: 0,
      }}
    >
      <Grid
        item
        style={{
          position: "absolute",
          lineHeight: "24px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {`${value.toLocaleString()}`}
      </Grid>
      <Grid
        item
        style={{
          // maxWidth: `${value.toLocaleString()}`,
          width: `${value.toLocaleString()}`,
          // height: 26,
          borderRadius: "0px 5px 5px 0px",
          backgroundColor: selectColor(onlyValue),
        }}
      ></Grid>
    </Grid>
  );
});

export function renderProgress(params: any) {
  // console.log(params.value);
  return <ProgressBar value={params.value} />;
}
