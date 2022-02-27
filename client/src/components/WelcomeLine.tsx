import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface IProps {
  username: string;
  isAdmin: boolean;
}

const WelcomeLine: React.FC<IProps> = (props) => {
  const { username, isAdmin } = props;
  return (
    <Typography variant="h5" component="div" sx={{ padding: 3 }}>
      <Box display="inline"> שלום </Box>
      <Box sx={{ fontWeight: "bold" }} display="inline">
        {username}
      </Box>
      <Box display="inline"> סוג משתמש: </Box>
      <Box sx={{ fontWeight: "bold" }} display="inline">
        {isAdmin ? "אדמין" : "סטנדרטי"}
      </Box>
    </Typography>
  );
};

export default WelcomeLine;
