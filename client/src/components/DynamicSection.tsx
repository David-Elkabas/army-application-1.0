import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

type Props = {};

const DynamicSection = (props: Props) => {
  return (
    <>
      <Button variant="contained" endIcon={<AddIcon />}>
        הוסף
      </Button>
    </>
  );
};

export default DynamicSection;
