import { Grid } from "@mui/material";
import React from "react";
import LastModifiedDate from "./LastModifiedDate";
import UserInfo from "./UserInfo";

type IProps = {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
};

const PageHeader = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;
  return (
    <Grid
      container
      direction="row"
      sx={{
        display: "flex",
        width: "90vw",
      }}
    >
      <Grid item xs={10}>
        <UserInfo
          username={username}
          isAdmin={isAdmin}
          selectedUnit={selectedUnit}
        />
      </Grid>
      <Grid item xs={2}>
        <LastModifiedDate
          accessToken={accessToken}
          selectedUnit={selectedUnit}
        />
      </Grid>
    </Grid>
  );
};

export default PageHeader;
