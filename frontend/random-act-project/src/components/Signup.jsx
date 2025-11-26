import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";

const Signup = () => {
  let [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
      form,
      { withCredentials: true }
    );

    alert("Signup Successfully");
    localStorage.setItem("token", res.data.token);
    navigate("/home");
  } catch (err) {
    alert(err.response?.data?.message || "Signup failed");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #f3e5f5, #f8bbd0, #fff9c4)", // pastel gradient
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            padding: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)", // semi-transparent white
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ fontSize: "28px", fontWeight: "600", color: "#d81b60" }}
          >
            Create Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              value={form.name}
              name="name"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Email"
              value={form.email}
              name="email"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Password"
              value={form.password}
              name="password"
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              variant="outlined"
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
              sx={{
                backgroundColor: "#d81b60",
                "&:hover": { backgroundColor: "#ad1457" },
              }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography
            variant="body2"
            align="center"
            marginTop={"10px"}
            sx={{ color: "#555" }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Signup;
