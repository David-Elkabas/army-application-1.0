import React, { useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import LandingPage from "./pages/UnitPage";
import ShowByPage from "./pages/ShowByPage";
import LoginPage from "./pages/LoginPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import "./App.css";
const theme = createTheme({
  palette: {
    background: {
      default: " #fbfbfb",
    },
  },
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [isShowByPage, setIsShowByPage] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box dir="rtl">
          <Grid container spacing={0} direction="column" alignItems="center">
            <Typography variant="h3" component="div">
              ויטלי מקמ''שים בע''מ
            </Typography>
            <Grid item xs={3}>
              {isLoginPage && <LoginPage />}
            </Grid>
            <Grid item xs={3}>
              {isLandingPage && (
                <LandingPage
                  setIsLandingPage={setIsLandingPage}
                  setIsShowByPage={setIsShowByPage}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              {isShowByPage && (
                <ShowByPage
                  setIsLandingPage={setIsLandingPage}
                  setIsShowByPage={setIsShowByPage}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
