import React, { useState } from "react";
import axios from "axios";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        form,
        { withCredentials: true }
      );

      // axios stores actual response in res.data
      localStorage.setItem("token", res.data.token);

      alert("Login Successful!");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f3e5f5, #f8bbd0, #fff9c4)"
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)"
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontSize: "28px", fontWeight: "600", color: "#d81b60" }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              }
              label="Show Password"
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#d81b60",
                "&:hover": { backgroundColor: "#ad1457" }
              }}
            >
              Login
            </Button>
          </Box>

          <Typography variant="body2" align="center" marginTop={"10px"} sx={{ color: "#555" }}>
            Don't have an account?{" "}
            <a href="/" style={{ textDecoration: "none", color: "#1976d2" }}>
              Sign Up
            </a>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
