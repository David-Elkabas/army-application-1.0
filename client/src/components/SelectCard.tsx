import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

interface IProps {
  value: string;
  header: string;
  description: string;
  image: string;
}
const SelectCard: React.FC<IProps> = (props) => {
  const { value, header, description, image } = props;
  return (
    <Box>
      <Grid container justifyContent="center">
        <Card
          sx={{
            maxWidth: 260,
            minHeight: 280,
            maxHeight: 280,
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
              <Typography gutterBottom variant="h5" component="div">
                {header}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Box>
  );
};

export default SelectCard;
