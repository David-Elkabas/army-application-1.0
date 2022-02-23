import { Box, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LoginLeftSide from "../components/LoginLeftSide";
import Copyright from "../components/Copyright";

import FormHelperText from "@mui/material/FormHelperText";

type Props = {};

const LoginPage = (props: Props) => {
  const [UsernameHelperText, setUsernameHelperText] = useState<
    string | undefined
  >("dfsdfG");
  const [passwordHelperText, setPasswordHelperText] = useState<
    string | undefined
  >("sdga ");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#f3f3f3",
        minWidth: 700,
        maxWidth: 700,
        minHeight: 500,
        maxHeight: 50,
        boxShadow: 2,
        borderRadius: 2,
        marginTop: 5,
        padding: 5,
      }}
    >
      <Grid container component="main">
        <Grid item xs={6} component={Paper} elevation={2} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h5"
              variant="h5"
              sx={{ mt: 2, fontWeight: 700, fontSize: 21 }}
            >
              התחברות ראשונית למערכת
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="שם משתמש"
                name="username"
                autoFocus
              />
              <FormControl error>
                <FormHelperText>{UsernameHelperText}</FormHelperText>
              </FormControl>

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControl error>
                <FormHelperText>{passwordHelperText}</FormHelperText>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                התחבר
              </Button>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <LoginLeftSide />
      </Grid>
    </Box>
  );
};
export default LoginPage;
