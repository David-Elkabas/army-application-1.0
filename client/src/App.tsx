import React, { useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import UnitPage from "./pages/UnitPage";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline, Grid, Typography } from "@mui/material";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "@fontsource/suez-one";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ShowByPage from "./pages/ShowByPage";
import Transceiver from "./pages/Transceiver";

import Particles from "react-tsparticles";
import particlesConfig from "./config/configParticles";

const theme = createTheme({
  palette: {
    background: {
      default: " #0d292a",
    },
  },
  // typography: {
  //   fontFamily: ["suez-one"].join(","),
  // },
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  const [username, setUsername] = useState(" ");
  const [isAdmin, setIsAdmin] = useState(false);
  const [unitAccess, setUnitAccess] = useState<Array<string>>([]);
  const [selectedUnit, setSelectedUnit] = useState(" ");

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          dir="rtl"
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              zIndex: 0,
            }}
          >
            <Particles options={particlesConfig} />
          </div>
          <Grid container spacing={0} direction="column" alignItems="center">
            <Typography
              variant="h3"
              component="div"
              sx={{ m: 1, fontWeight: 700, color: "white" }}
            >
              ויטלי מקמ''שים בע''מ
            </Typography>
            <Box sx={{ zIndex: 1 }}>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/login-page"
                    element={
                      <LoginPage
                        setUsername={setUsername}
                        setIsAdmin={setIsAdmin}
                        setUnitAccess={setUnitAccess}
                      />
                    }
                  />
                  <Route
                    path="/show-by-page"
                    element={
                      <ShowByPage
                        username={username}
                        isAdmin={isAdmin}
                        selectedUnit={selectedUnit}
                      />
                    }
                  />
                  <Route
                    path="/unit-page"
                    element={
                      <UnitPage
                        username={username}
                        isAdmin={isAdmin}
                        unitAccess={unitAccess}
                        setSelectedUnit={setSelectedUnit}
                      />
                    }
                  />
                  <Route path="/transceiver" element={<Transceiver />} />

                  <Route path="*" element={<Navigate to="/login-page" />} />
                </Routes>
              </BrowserRouter>
            </Box>
            {/* <Grid item xs={3}>
              {isLoginPage && (
                <LoginPage
                  setIsLoginPage={setIsLoginPage}
                  setIsUnitPage={setIsUnitPage}
                  setUsername={setUsername}
                  setIsAdmin={setIsAdmin}
                  setUnitAccess={setUnitAccess}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              {isUnitPage && (
                <UnitPage
                  setIsLoginPage={setIsLoginPage}
                  setIsUnitPage={setIsUnitPage}
                  setIsShowByPage={setIsShowByPage}
                  username={username}
                  isAdmin={isAdmin}
                  unitAccess={unitAccess}
                  setSelectedUnit={setSelectedUnit}
                />
              )}
            </Grid>
            <Grid item xs={3}>
              {isShowByPage && (
                <ShowByPage
                  setIsUnitPage={setIsUnitPage}
                  setIsShowByPage={setIsShowByPage}
                  username={username}
                  isAdmin={isAdmin}
                  selectedUnit={selectedUnit}
                />
              )}
            </Grid> */}
          </Grid>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
