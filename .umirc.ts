import { defineConfig } from 'umi';
import theme from "./src/themes/theme";

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  dva: {
    immer: true, // Enable dva-immer for elegant reducer writing experience
  },
  antd: {},
  theme
});
