import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import InfoText from "../components/InfoText";
import PageHeader from "../components/PageHeader";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

const RcgwPage = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };
  return (
    <>
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
          <InfoText name='ישל"קים' />

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
    </>
  );
};

export default RcgwPage;
