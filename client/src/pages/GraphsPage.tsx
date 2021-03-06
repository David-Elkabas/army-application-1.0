import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  CssBaseline,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import MakmashTable from "../components/MakmashTable";
import PieCharts from "../components/PieCharts";
import NetworkChart from "../components/NetworkChart";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageHeader from "../components/PageHeader";
import InfoText from "../components/InfoText";
import DynamicSection from "../components/DynamicSection";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    background: {
      default: "#0d292a",
    },
    secondary: {
      main: "rgba(75, 192, 192, 1)",
    },
    error: {
      main: "rgba(255, 99, 132, 1)",
    },
  },
});
interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

const GraphsPage = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper sx={{ bgcolor: "#f3f3f3", px: 5, mx: 5 }}>
          <Box>
            <Box>
              <PageHeader
                username={username}
                isAdmin={isAdmin}
                selectedUnit={selectedUnit}
                accessToken={accessToken}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleClick}
              size="large"
              sx={{ mb: 1, px: 7 }}
            >
              חזור
            </Button>
            <Grid container direction="row">
              <Grid item xs={6}>
                <DynamicSection
                  selectedUnit={selectedUnit}
                  accessToken={accessToken}
                />
              </Grid>
              <Grid item xs={6}>
                <Grid item xs={12}>
                  <Grid container>
                    <PieCharts
                      accessToken={accessToken}
                      selectedUnit={selectedUnit}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <NetworkChart
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  />
                </Grid>
              </Grid>
            </Grid>
            <ReactQueryDevtools initialIsOpen={false} />
            <Stack direction="row" spacing={5} justifyContent="center">
              <Button
                variant="contained"
                onClick={handleClick}
                size="large"
                sx={{ margin: 5, px: 7 }}
              >
                חזור
              </Button>
            </Stack>
          </Box>
        </Paper>
      </ThemeProvider>
    </>
  );
};

export default GraphsPage;
