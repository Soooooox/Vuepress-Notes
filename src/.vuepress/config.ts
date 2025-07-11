import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Soooooox 的小屋",
  description: "个人笔记文档，爱好记录",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});

