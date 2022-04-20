import { Box, Button, Grid, Paper, Stack } from "@mui/material";
import { ProgressBar } from "react-bootstrap";
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

const UvtPage = (props: IProps) => {
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
          <InfoText name='ידב"רים' />

          <Grid container direction="row">
            <Grid item xs={7} sx={{ justifyContent: "center" }}>
              <Box sx={{ maxWidth: 50 }}>
                <ProgressBar>
                  <ProgressBar variant="success" now={35} key={1} />
                  <ProgressBar variant="warning" now={20} key={2} />
                  <ProgressBar variant="danger" now={10} key={3} />
                </ProgressBar>
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
    </>
  );
};

export default UvtPage;
