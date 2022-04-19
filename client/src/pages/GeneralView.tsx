import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import GeneralBlock from "../components/GeneralBlock";
import PageHeader from "../components/PageHeader";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

const GeneralView = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };
  return (
    <>
      <Paper sx={{ bgcolor: "#f3f3f3", px: 5 }}>
        <Box>
          <Box sx={{ mx: "auto", width: 1 }}>
            <PageHeader
              username={username}
              isAdmin={isAdmin}
              selectedUnit={selectedUnit}
              accessToken={accessToken}
            />
          </Box>

          <Grid
            container
            sx={{ width: "100vw" }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <GeneralBlock
              accessToken={accessToken}
              selectedUnit={selectedUnit}
            />
          </Grid>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default GeneralView;
