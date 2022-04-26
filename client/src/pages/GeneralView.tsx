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
      <Paper sx={{ bgcolor: "#f3f3f3", px: 5, width: "95vw" }}>
        <Box>
          <Box sx={{ mx: "auto", width: 1 }}>
            <PageHeader
              username={username}
              isAdmin={isAdmin}
              selectedUnit={selectedUnit}
              accessToken={accessToken}
            />
          </Box>
          <Button variant="contained" onClick={handleClick} size="large">
            חזור חזרה
          </Button>

          <Grid container sx={{ width: "90vw" }} direction="row">
            <GeneralBlock
              accessToken={accessToken}
              selectedUnit={selectedUnit}
            />
          </Grid>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              onClick={handleClick}
              size="large"
              sx={{ mb: 5 }}
            >
              חזור חזרה
            </Button>
          </Stack>
        </Box>
      </Paper>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default GeneralView;
