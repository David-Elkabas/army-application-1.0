import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";

interface IProps {
  setIsUnitPage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowByPage: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  isAdmin: boolean;
}

const unitListWithServers = [
  { name: "36", value: "36", servers: "תקשי שרתים 178,179" },
  { name: "98", value: "98", servers: "תקשי שרתים 183,184" },
  { name: "שדב לומר", value: "lomar", servers: "תקשי שרתים 158,159" },
];

const UnitPage: React.FC<IProps> = (props) => {
  const { setIsUnitPage, setIsShowByPage, username, isAdmin } = props;
  const [unit, setUnit] = useState("");
  const [helperText, setHelperText] = useState<string | undefined>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleChange = (event: SelectChangeEvent): void => {
    setUnit(event.target.value);
    let item = unitListWithServers.find((unit) => {
      if (unit.value === event.target.value) return unit.servers;
      return undefined;
    });
    // console.log(item);
    if (item !== undefined) {
      setHelperText(item.servers);
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
      setHelperText(undefined);
    }
  };
  const handleClick = (): void => {
    setIsUnitPage(false);
    setIsShowByPage(true);
  };

  return (
    <Box
      sx={{
        bgcolor: "#f3f3f3",
        minWidth: 500,
        minHeight: 350,
        boxShadow: 2,
        borderRadius: 2,
        marginTop: 5,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="div" sx={{ padding: 3 }}>
            {`שלום ${username}  `}
            סוג משתמש: {isAdmin ? "אדמין" : "סטנדרטי"}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="unit-id">יחידה</InputLabel>
            <Select
              labelId="unit-label"
              id="unit-select-id"
              value={unit}
              label="thisUnit"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>נקה</em>
              </MenuItem>
              <MenuItem value={"36"}>36</MenuItem>
              <MenuItem value={"98"}>98</MenuItem>
              <MenuItem value={"lomar"}>שדב לומר</MenuItem>
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={handleClick}
            size="large"
          >
            בחר אתר זה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnitPage;
