# 个人网站

我的个人技术展示网站，包含自我介绍、技能展示、AI 项目作品集和联系方式。

## 项目背景

需要一个集中展示个人技术能力和 AI 项目的平台，同时也是自己学习前端和网站部署的实践项目。整个网站使用 Claude Code（AI 编程助手）辅助开发，从设计到部署全部独立完成。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | 原生 HTML5 + CSS3 + JavaScript（无框架） |
| 样式 | 自定义 CSS 变量系统、响应式布局、CSS 动画 |
| 图标 | Emoji + SVG favicon |
| SEO | Open Graph、Twitter Card、Schema.org 结构化数据 |
| 部署 | Gitee Pages |
| 开发工具 | Claude Code（AI 辅助编程）、VS Code |

## 项目结构

```
Personalwebsite/
├── index.html          # 主页面（单页应用）
├── resume.html         # 在线简历（可打印为 PDF）
├── resume.pdf          # 简历 PDF
├── css/
│   └── style.css       # 全局样式（CSS 变量、响应式、动画）
├── js/
│   └── main.js         # 交互逻辑（导航、滚动、弹窗、滚动揭示）
├── images/
│   └── avatar.jpg      # 个人照片
├── favicon.svg         # 网站图标
├── demos/              # 项目演示截图和视频
├── smart-customer-service/   # 子项目：智能客服助手
├── ai-image-tool/             # 子项目：AI 图像创作工具
├── meeting-assistant/         # 子项目：AI 智能会议助手
└── README.md
```

## 网站板块

| 板块 | 内容 |
|------|------|
| 首页 (Hero) | 姓名、定位、一句话介绍、CTA 按钮 |
| 关于我 | 个人简介、教育背景、所在地、求职状态 |
| 技能 | 编程语言、AI 开发、数据处理、工具平台 |
| 项目 | 3 个主要 AI 应用的项目卡片，含演示弹窗 |
| 联系 | 邮箱（点击复制）、微信（点击复制）、Gitee、GitHub |

## 功能特性

- **响应式布局**：适配桌面、平板、手机三种尺寸
- **滚动导航**：滚动时导航栏高亮当前板块，背景半透明毛玻璃效果
- **汉堡菜单**：移动端折叠菜单，点击外部自动关闭
- **滚动揭示动画**：IntersectionObserver 实现的渐入动画
- **项目演示弹窗**：支持图片轮播和视频播放，键盘左右切换
- **一键复制**：点击邮箱/微信卡片自动复制到剪贴板
- **回到顶部**：滚动超过 500px 后显示浮动按钮
- **无障碍**：Skip to content 链接、aria 标签、prefers-reduced-motion 支持
- **SEO 优化**：完整的 meta 标签、Open Graph、Twitter Card、JSON-LD 结构化数据

## 如何运行

纯静态网站，无需构建工具。

```bash
# 方式一：直接用浏览器打开
start index.html

# 方式二：用任意静态服务器
python -m http.server 8080
# 浏览器访问 http://localhost:8080

# 方式三：VS Code Live Server 插件
# 右键 index.html → Open with Live Server
```
