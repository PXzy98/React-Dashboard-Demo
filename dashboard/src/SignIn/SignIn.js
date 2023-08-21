import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");

  const [password, setpassword] = useState("");

  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));

  const users = [{ username: "Jane", password: "testpassword" },
                {username: "xyz", password: "7782230626"},
                {username: "xzy", password: "2269276536"}
                ];

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
            setauthenticated(true)
            localStorage.setItem("authenticated", true);
            navigate("/dashboard");
            console.log({
              email: data.get('email'),
              password: data.get('password'),
            });
    } else {
      setMessage("Wrong username or password");
      setOpen(true);
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
                    {message}
                </Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              value={username}
              onChange={(event) => setusername(event.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}