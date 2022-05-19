import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  Tab,
  Tabs,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import MakmashTable from "../components/MakmashTable";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import PageHeader from "../components/PageHeader";
import InfoText from "../components/InfoText";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  palette: {
    background: {
      default: "#0d292a",
    },
    secondary: {
      main: "rgba(75, 192, 192, 1)",
    },
    error: {
      main: "rgba(255, 99, 132, 1)",
    },
  },
});

interface IProps {
  username: string;
  isAdmin: boolean;
  selectedUnit: string;
  accessToken: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Transceiver = (props: IProps) => {
  const { username, isAdmin, selectedUnit, accessToken } = props;

  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (): void => {
    navigate("/show-by-page");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
            <InfoText name='מקמ"שים' />
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                  dir="ltr"
                >
                  <Tab label="RCGW" {...a11yProps(0)} />
                  <Tab label="CCU" {...a11yProps(1)} />
                  <Tab label="CCT" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Box dir="ltr">
                      <MakmashTable
                        accessToken={accessToken}
                        selectedUnit={selectedUnit}
                        table="RCGW"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Box dir="ltr">
                      <MakmashTable
                        accessToken={accessToken}
                        selectedUnit={selectedUnit}
                        table="CCU"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Grid container direction="row">
                  <Grid item xs={12}>
                    <Box dir="ltr">
                      <MakmashTable
                        accessToken={accessToken}
                        selectedUnit={selectedUnit}
                        table="CCT"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
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
      </ThemeProvider>
    </>
  );
};

export default Transceiver;
