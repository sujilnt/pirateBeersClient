import { defineConfig } from 'umi';
import theme from "./src/themes/theme";

export default defineConfig({
  define:{
    API_URL: process.env.API_URL || "http://localhost:8000",
  },
  dva: {
    immer: true, // Enable dva-immer for elegant reducer writing experience
  },
  antd: {},
  theme
});
