import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  // hostname: "",

  author: {
    name: "Soooooox",
    // url: "",
  },

  // logo: "",

  // repo: "",

  docsDir: "src",


  // 主题布局选项
  // 导航栏
  navbar,
  navbarTitle: 'Soooooox 的小屋',

  // 侧边栏
  sidebar,

  // 导航相关
  prevLink: false, // 禁用上一页链接
  nextLink: false, // 禁用下一页链接

  // 页面元数据
  pageInfo: ["Author", "Date", "ReadingTime","Word"], // 文章信息
  externalLinkIcon: false, // 启用外部链接图标
  lastUpdated: true, // 启用最后更新时间
  editLink:false, // 禁用编辑链接

  // 页脚
  displayFooter: true,

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // Markdown 配置
  markdown: { 
    // component: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    spoiler: true,
    sub: true,
    sup: true,
    tasklist: true,
    footnote: true,
    math: {
      type: "mathjax",
    },
  },

  // 在这里配置主题提供的插件
  plugins: {

    // components: {
    //   components: ["Badge", "VPCard"],
    // },

    icon: {
      prefix: "fa6-solid:",
    }, // 图标前缀，网站：https://fontawesome.com/icons
    // catalog:({
    //   level:1,
    //   index:false,
    //   exclude:['README.md', 'index.md'],
    // }),

  },
});
