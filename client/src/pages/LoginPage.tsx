import { Box, FormControl, Typography } from "@mui/material";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LoginLeftSide from "../components/LoginLeftSide";
import Copyright from "../components/Copyright";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface IProps {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUnitAccess: React.Dispatch<React.SetStateAction<string[]>>;
}

const LoginPage = (props: IProps) => {
  const { setUsername, setIsAdmin, setUnitAccess } = props;
  const [UsernameHelperText, setUsernameHelperText] = useState<
    string | undefined
  >(" ");
  const [passwordHelperText, setPasswordHelperText] = useState<
    string | undefined
  >(" ");

  const navigate = useNavigate();

  const SendLoginRequest = async (
    username: string,
    password: string
  ): Promise<any> => {
    try {
      const res = await axios.post("http://localhost:5005/api/login", {
        username,
        password,
      });
      setUsername(res.data.username);
      setIsAdmin(res.data.isAdmin);
      setUnitAccess(res.data.unitAccess);
      console.log(res.data);
      navigate("/unit-page");
      // setIsLoginPage(false);
      // setIsUnitPage(true);
    } catch (err) {
      setPasswordHelperText("שם המשתמש או הסיסמה שגויים");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const username = String(data.get("username"));
    const password = String(data.get("password"));

    if (username.length < 5 || password.length < 5) {
      if (username.length < 5)
        setUsernameHelperText("שם משתמש חייב לכלול לפחות 5 תווים");
      else setUsernameHelperText(" ");
      if (password.length < 5)
        setPasswordHelperText("סיסמה חייבת לכלול לפחות 5 תווים");
      else setPasswordHelperText(" ");
    } else {
      setUsernameHelperText(" ");
      setPasswordHelperText(" ");
      const x = SendLoginRequest(username, password);
    }
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
