import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import GeneralBlock from "../components/GeneralBlock";
import InfoText from "../components/InfoText";
import PageHeader from "../components/PageHeader";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

const queryClient = new QueryClient();

const GeneralView = (props: IProps) => {
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

            <Grid container direction="row">
              <Grid item xs={7} sx={{ justifyCsontent: "center" }}>
                <Box>
                  <GeneralBlock
                    accessToken={accessToken}
                    selectedUnit={selectedUnit}
                  />
                </Box>
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

export default GeneralView;
