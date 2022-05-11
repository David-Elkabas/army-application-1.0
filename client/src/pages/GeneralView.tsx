import { Box, Button, Card, Grid, Paper, Stack } from "@mui/material";
import { Table } from "react-bootstrap";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import GeneralBlock from "../components/GeneralBlock";
import PageHeader from "../components/PageHeader";
import TableOfContents from "../components/TableOfContents";

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
          <Grid container justifyContent="space-between">
            <Grid item xs={7}>
              <Button variant="contained" onClick={handleClick} size="large">
                חזור חזרה
              </Button>
            </Grid>
            <Grid item xs={5}>
              <TableOfContents />
            </Grid>
          </Grid>

          <Grid container sx={{ width: "90vw" }} direction="row">
            <Grid item xs={10}>
              <GeneralBlock
                accessToken={accessToken}
                selectedUnit={selectedUnit}
              />
            </Grid>
            <Grid item xs={2}>
              <Box sx={{ marginTop: 15, borderColor: "black", border: 1 }}>
                {" "}
                hello
              </Box>
            </Grid>
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
