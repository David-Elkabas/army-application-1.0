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
import RcgwPage from "./pages/RcgwPage";
import UvtPage from "./pages/UvtPage";
import GeneralView from "./pages/GeneralView";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/types/devtools";

import "bootstrap/dist/css/bootstrap.min.css";

const theme = createTheme({
  palette: {
    background: {
      default: "#0d292a",
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5000,
    },
  },
});

const AppWrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  const [username, setUsername] = useState(" ");
  const [isAdmin, setIsAdmin] = useState(false);
  const [unitAccess, setUnitAccess] = useState<Array<string>>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState(" ");

  return (
    <>
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
                      setAccessToken={setAccessToken}
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
                <Route
                  path="/transceiver"
                  element={
                    <Transceiver
                      username={username}
                      isAdmin={isAdmin}
                      accessToken={accessToken}
                      selectedUnit={selectedUnit}
                    />
                  }
                />
                <Route
                  path="/rcgw"
                  element={
                    <RcgwPage
                      username={username}
                      isAdmin={isAdmin}
                      selectedUnit={selectedUnit}
                      accessToken={accessToken}
                    />
                  }
                />

                <Route
                  path="/uvt"
                  element={
                    <UvtPage
                      username={username}
                      isAdmin={isAdmin}
                      selectedUnit={selectedUnit}
                      accessToken={accessToken}
                    />
                  }
                />
                <Route
                  path="/general-view"
                  element={
                    <GeneralView
                      username={username}
                      isAdmin={isAdmin}
                      selectedUnit={selectedUnit}
                      accessToken={accessToken}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/login-page" />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default AppWrapper;
