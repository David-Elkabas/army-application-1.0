import { Box, Typography } from "@mui/material";
import React from "react";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
}

const UserInfo: React.FC<IProps> = (props) => {
  const { username, isAdmin, selectedUnit } = props;
  return (
    <Box sx={{ justifyContent: "center", alignItems: "center" }}>
      <Typography variant="h5" component="div" sx={{ py: 3, pr: 3 }}>
        <Box display="inline"> שם משתמש: </Box>
        <Box sx={{ fontWeight: "bold" }} display="inline">
          {username}
        </Box>
        <Box display="inline"> יחידה נבחרת: </Box>
        <Box sx={{ fontWeight: "bold" }} display="inline">
          {selectedUnit}
        </Box>
        <Box display="inline"> סוג משתמש: </Box>
        <Box sx={{ fontWeight: "bold" }} display="inline">
          {isAdmin ? "אדמין" : "סטנדרטי"}
        </Box>
      </Typography>
    </Box>
  );
};

export default UserInfo;
