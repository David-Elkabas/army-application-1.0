import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";
import WelcomeLine from "../components/WelcomeLine";

interface IProps {
  setIsUnitPage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowByPage: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  isAdmin: boolean;
  unitAccess: string[] | undefined;
}

const unitListWithServers = [
  { name: "36", value: "36", servers: "תקשי שרתים 178,179" },
  { name: "98", value: "98", servers: "תקשי שרתים 183,184" },
  { name: "שדב לומר", value: "lomar", servers: "תקשי שרתים 158,159" },
];

const UnitPage: React.FC<IProps> = (props) => {
  const { setIsUnitPage, setIsShowByPage, username, isAdmin, unitAccess } =
    props;
  const [unit, setUnit] = useState("");
  const [helperText, setHelperText] = useState<string | undefined>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const testSelectedValue = (selectedValue: string): void => {
    setUnit(selectedValue);
    let item = unitListWithServers.find((unit) => {
      if (unit.value === selectedValue) return unit.servers;
      return undefined;
    });
    if (item !== undefined) {
      if (isAdmin || unitAccess?.includes(item.value)) {
        setHelperText(item.servers);
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
        setHelperText(undefined);
      }
    } else {
      setIsDisabled(true);
      setHelperText(undefined);
    }
  };
  useEffect(() => {
    if (unitAccess) {
      testSelectedValue(unitAccess[0]);
      // console.log(unitAccess[0]);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent): void => {
    testSelectedValue(event.target.value);
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
          <WelcomeLine username={username} isAdmin={isAdmin} />
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
              {unitListWithServers.map((unit) => {
                return (
                  <MenuItem
                    key={unit.value}
                    value={unit.value}
                    sx={{
                      backgroundColor:
                        isAdmin || unitAccess?.includes(unit.value)
                          ? "lightgreen"
                          : "grey",
                    }}
                  >
                    {unit.value}
                  </MenuItem>
                );
              })}
              {/* <MenuItem
                value={"36"}
                sx={{
                  backgroundColor:
                    isAdmin || unitAccess?.includes("36")
                      ? "lightgreen"
                      : "grey",
                }}
              >
                36
              </MenuItem>
              <MenuItem
                value={"98"}
                sx={{
                  backgroundColor:
                    isAdmin || unitAccess?.includes("98")
                      ? "lightgreen"
                      : "grey",
                }}
              >
                98
              </MenuItem>
              <MenuItem
                value={"lomar"}
                sx={{
                  backgroundColor:
                    isAdmin || unitAccess?.includes("lomar")
                      ? "lightgreen"
                      : "grey",
                }}
              >
                שדב לומר
              </MenuItem> */}
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
