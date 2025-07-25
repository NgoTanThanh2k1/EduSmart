import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js"; // nếu bạn có custom theme
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
