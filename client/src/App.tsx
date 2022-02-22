import React, { useState } from "react";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import LandingPage from "./components/LandingPage";
import ShowByPage from "./components/ShowByPage";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";

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
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [isShowByPage, setIsShowByPage] = useState(false);

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
