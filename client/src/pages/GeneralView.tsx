import { YardOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { ReactQueryDevtools } from "react-query/devtools";
import { useNavigate } from "react-router-dom";
import DeviceColumnNoStar from "../components/DeviceColumnNoStar";
import GeneralBlock from "../components/GeneralBlock";
import PageHeader from "../components/PageHeader";
import TableOfContents from "../components/TableOfContents";

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

type DevicePerems = {
  location: string;
  type: string;
  device: string;
  OK: number;
  ERROR: number;
  FAILED: number;
};

const GeneralView = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const [favoriteStations, setFavoriteStations] = useState<DevicePerems[]>([]);
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/show-by-page");
  };
  return (
    <>
      <Paper sx={{ bgcolor: "#f3f3f3", px: 5, width: "95vw" }}>
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
        </Grid>

        <Grid container direction="row" sx={{ width: "90vw" }}>
          <Grid item xs={10}>
            <GeneralBlock
              accessToken={accessToken}
              selectedUnit={selectedUnit}
              favoriteStations={favoriteStations}
              setFavoriteStations={setFavoriteStations}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ position: "fixed ", overflow: "hidden" }}>
              <Box
                height="450px"
                width="300px"
                sx={{
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": { display: "none" },
                  borderRadius: 3,
                  marginTop: 15,
                  border: 5,
                  pb: 5,
                }}
              >
                <Typography
                  component="h4"
                  variant="h4"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    fontSize: 35,
                    color: "#f5c71a",
                  }}
                >
                  מועדפים
                </Typography>

                {favoriteStations &&
                  favoriteStations.map((ele) => {
                    return (
                      <DeviceColumnNoStar
                        device={ele.device}
                        OK={ele.OK}
                        ERROR={ele.ERROR}
                        FAILED={ele.FAILED}
                        type={ele.type}
                        location={ele.location}
                        favoriteStations={favoriteStations}
                        setFavoriteStations={setFavoriteStations}
                      />
                    );
                  })}
              </Box>
              <Grid item xs={2}>
                <TableOfContents />
              </Grid>
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
      </Paper>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default GeneralView;
