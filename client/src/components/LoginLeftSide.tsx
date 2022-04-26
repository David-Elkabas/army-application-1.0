import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import login from "../images/login.png";

type Props = {};

const LoginLeftSide = (props: Props) => {
  const image = login;
  const imageName = "image";
  return (
    <Grid
      item
      component={Paper}
      elevation={0}
      square
      xs={6}
      sx={{
        backgroundColor: "white",
        minHeight: 400,
        maxHeight: 400,
      }}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            sx={{ width: 1, minHeight: 400, maxHeight: 400 }}
            component="img"
            image={image}
            alt={imageName}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};
export default LoginLeftSide;
