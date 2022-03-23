import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MakmashTable from "../components/MakmashTable";
import PieCharts from "../components/PieCharts";
import NetworkChart from "../components/NetworkChart";
import UserInfo from "../components/UserInfo";
import LastModifiedDate from "../components/LastModifiedDate";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}
const queryClient = new QueryClient();

const Transceiver = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Paper sx={{ bgcolor: "#f3f3f3", px: 5 }}>
          <Box>
            <Box>
              <Grid container direction="row">
                <Grid item>
                  <UserInfo
                    username={username}
                    isAdmin={isAdmin}
                    selectedUnit={selectedUnit}
                  />
                </Grid>
                <Grid item sx={{ padding: 3 }}>
                  <LastModifiedDate
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography
              component="h3"
              variant="h3"
              sx={{ fontWeight: 700, fontSize: 21 }}
            >
              מסך מקמ''שים
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 300, fontSize: 21 }}
            >
              הצגת ניטור עבור כלל המקמ''שים המחוברים ומוגדרים בקובץ הפק''ל כולל
              ניתוח סטאטוס
            </Typography>

            <Grid
              container
              direction="row"
              sx={{
                display: "flex",
                width: "60vw",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ justifyContent: "center", width: "50vw" }}
              >
                <Box>
                  <MakmashTable
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  />
                </Box>
              </Grid>
              <Grid container direction="row" xs={12}>
                <Grid container xs={6}>
                  <PieCharts
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  />
                </Grid>
                <Grid item xs={6}>
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
                sx={{ margin: 5 }}
              >
                חזור חזרה{" "}
              </Button>
            </Stack>
          </Box>
        </Paper>
      </QueryClientProvider>
    </>
  );
};

export default Transceiver;
