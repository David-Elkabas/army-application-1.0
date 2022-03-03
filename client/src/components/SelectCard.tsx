import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";

interface IProps {
  index: number;
  value: string;
  header: string;
  description: string;
  image: string;
}
const SelectCard: React.FC<IProps> = (props) => {
  const { index, value, header, description, image } = props;
  return (
    <Box>
      <Grid container justifyContent="center">
        <Tooltip
          title={
            <Typography fontSize={20} align="left">
              {description}
            </Typography>
          }
          leaveDelay={200}
          arrow
          placement={index % 2 === 0 ? "right" : "left"}
          sx={{ fontSize: 10 }}
        >
          <Card
            sx={{
              maxWidth: 260,
              minHeight: 220,
              maxHeight: 220,
            }}
          >
            <CardActionArea>
              <CardMedia
                sx={{ width: 1 }}
                component="img"
                image={image}
                alt={value}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  align="center"
                >
                  {header}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                {description}
              </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        </Tooltip>
      </Grid>
    </Box>
  );
};

export default SelectCard;
