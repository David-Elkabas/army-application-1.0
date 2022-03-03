import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import WelcomeLine from "../components/WelcomeLine";
import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  isAdmin: boolean;
  unitAccess: string[] | undefined;
  setSelectedUnit: React.Dispatch<React.SetStateAction<string>>;
}

const unitListWithServers = [
  { name: "36", value: "36", servers: "תק''שי שרתים 178,179" },
  { name: "98", value: "98", servers: "תק''שי שרתים 183,184" },
  { name: "שדב לומר", value: "lomar", servers: "תק''שי שרתים 158,159" },
];

const UnitPage: React.FC<IProps> = (props) => {
  const { username, isAdmin, unitAccess, setSelectedUnit } = props;
  const [unit, setUnit] = useState("");
  const [helperText, setHelperText] = useState<string | undefined>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  const testSelectedValue = (selectedValue: string): void => {
    setUnit(selectedValue);
    let item = unitListWithServers.find((unit) => {
      if (unit.value === selectedValue) return unit.servers;
      return undefined;
    });
    if (item !== undefined) {
      if (isAdmin || unitAccess?.includes(item.value)) {
        setHelperText(item.servers);
        setIsButtonDisabled(false);
      } else {
        setHelperText(item.servers);
        setIsButtonDisabled(true);
      }
    } else {
      setIsButtonDisabled(true);
      setHelperText(undefined);
    }
  };
  useEffect(() => {
    if (unitAccess) {
      testSelectedValue(unitAccess[0]);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent): void => {
    testSelectedValue(event.target.value);
  };
  const handleButtonClick = (): void => {
    navigate("/show-by-page");

    setSelectedUnit(unit);
  };

  const handleReturnButtonClick = (): void => {
    navigate("/login-page");
  };

  return (
    <Box
      sx={{
        bgcolor: "#f3f3f3",
        minWidth: 500,
        minHeight: 350,
        boxShadow: 2,
        borderRadius: 2,
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
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            disabled={isButtonDisabled}
            onClick={handleButtonClick}
            size="large"
          >
            בחר אתר זה
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={handleReturnButtonClick}
            size="large"
            sx={{ mt: 15, mb: 5 }}
          >
            חזור חזרה
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnitPage;
