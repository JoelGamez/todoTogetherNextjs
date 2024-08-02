"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "300", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: "'Arial', sans-serif",
  },
  // palette: {
  //   background: {
  //     default: "#d9c771", // Yellow background
  //   },
  // },
});

export default theme;
