import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MakmashTable from "../components/MakmashTable";
import axios from "axios";
import PieCharts from "../components/PieCharts";

interface IProps {
  unitAccess: string[] | undefined;
  accessToken: string;
}
const queryClient = new QueryClient();

const Transceiver = (props: IProps) => {
  const { unitAccess, accessToken } = props;
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Paper sx={{ bgcolor: "#f3f3f3", padding: 5 }}>
          <Box>
            {/* {accessToken} */}
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
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12}>
                <Box>
                  <MakmashTable accessToken={accessToken} />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <PieCharts accessToken={accessToken} />
              </Grid>
              <Grid item xs={3}>
                hello2
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
