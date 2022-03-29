import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

const queryClient = new QueryClient();

const UvtPage = (props: IProps) => {
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
              <PageHeader
                username={username}
                isAdmin={isAdmin}
                selectedUnit={selectedUnit}
                accessToken={accessToken}
              />
            </Box>
            <Typography
              component="h3"
              variant="h3"
              sx={{ fontWeight: 700, fontSize: 21 }}
            >
              מסך ידב"רים
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              sx={{ fontWeight: 300, fontSize: 21 }}
            >
              הצגת ניטור עבור כלל הידב"רים המחוברים ומוגדרים בקובץ הפק''ל כולל
              ניתוח סטאטוס
            </Typography>

            <Grid container direction="row">
              <Grid item xs={7} sx={{ justifyContent: "center" }}>
                <Box>
                  {/* <MakmashTable
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  /> */}
                </Box>
              </Grid>
              {/* <Grid item xs={5}>
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
              </Grid> */}
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

export default UvtPage;
