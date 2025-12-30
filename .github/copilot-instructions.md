# Copilot 指令 — MyTravelBlog

目标：帮助 AI 编码代理快速上手、修改与扩展此 Next.js（app-dir）旅行博客项目。

- 项目类型：Next.js 13（app directory）、TypeScript、Tailwind（通过 `postcss.config.mjs`）
- 入口目录：`src/app/`（布局：`src/app/layout.tsx`，首页：`src/app/page.tsx`）
- 主要组件：位于 `src/components/`，例如 `Header.tsx`、`Footer.tsx`、`Hero.tsx`、`StoryCard.tsx`、`TripTimeline.tsx` 等

关键命令（在项目根目录运行）：

- 启动开发服务器：`npm run dev`（默认端口 3000）
- 生产构建：`npm run build`
- 运行构建后的应用：`npm run start`
- 代码检查（仓库已有）：`npm run lint`（注意：`package.json` 中为 `eslint`，必要时运行 `npx eslint . --ext .ts,.tsx`）

架构与数据流（可被 AI 直接使用的事实）：

- 前端：整体使用 Next.js app-dir；Server Components 可放在 `src/app` 中的服务器端文件，客户端交互使用客户端组件（组件内若有 `useState`/`useEffect` 则需要加 `'use client'`）。示例入口：`src/app/layout.tsx`（布局、全局 font、Header/Footer）与 `src/app/page.tsx`（页面编排）。
- 数据：当前页面使用内联示例数据（见 `src/app/page.tsx` 注释“示例数据 - 后续会从 Notion 获取”），项目依赖中包含 `@notionhq/client` —— 若要引入 Notion 后端同步，建议在 `src/app/api/` 或 `src/lib/` 下添加服务器端帮助模块并在 server component 中调用。
- 图片与远程源：`next.config.ts` 已配置 `images.remotePatterns` 支持 Unsplash（`images.unsplash.com`、`plus.unsplash.com`），AI 在添加远程图片时应保证域名匹配该配置或在 `next.config.ts` 中扩展。

代码风格与约定（仓库内可观察到的具体规则）：

- CSS：全局样式在 `src/app/globals.css`，使用 Tailwind v4 插件（`postcss.config.mjs` 指向 `@tailwindcss/postcss`）。项目使用若干 CSS 变量（如 `--primary`、`--font-inter`），尽量沿用这些变量而非直接写死颜色或字体。
- 布局类：项目定义了 `container-custom`、`btn-primary`、`gradient-primary` 等语义类（见 `src/app/page.tsx`），AI 修改样式时应优先复用这些类名。
- 类型导出：组件会导出类型以复用（在 `src/app/page.tsx` 中：`Story` 来自 `src/components/StoryCard.tsx`，`TripDay` 来自 `src/components/TripTimeline.tsx`）。修改接口或类型时请同时更新所有引用处。
- 字体：使用 `next/font/google` 在 `layout.tsx` 中注入 `Inter`，不要同时引入重复字体加载逻辑。

对 AI 的具体建议（可被直接执行的变更模式）：

- 添加后端数据源：在 `src/lib/notion.ts`（示例名）中实现 Notion 客户端封装，暴露 `getStories()` 等函数，使用 Server Components 在 `src/app/page.tsx` 中切换到真实数据。保持现有 sample 数据作为回退和测试用例。
- 增加新页面或路由：遵循 app-dir 约定，创建 `src/app/stories/page.tsx` 用于故事列表，复用 `StoryCard` 组件并导出所需 props 类型。
- 修改图片来源：若新增域名，先在 `next.config.ts` 的 `images.remotePatterns` 中注册域名，之后才在组件中直接使用 `next/image` 或 `<img>`。

注意事项（已发现的潜在坑）：

- `npm run lint` 脚本只是 `eslint`，某些环境下需传入路径或扩展名；在 CI 中建议显式使用 `npx eslint . --ext .ts,.tsx`。
- 若引入 Server API（Notion key 等），请将敏感信息放入环境变量（`.env.local`）并在 Vercel/部署平台中设置，不要写入源码。

快速参考文件：

- 布局与全局样式：`src/app/layout.tsx`, `src/app/globals.css`
- 首页与示例数据：`src/app/page.tsx`
- 图片白名单：`next.config.ts`（`images.remotePatterns`）
- Tailwind / PostCSS：`postcss.config.mjs`
- package.json 脚本与依赖：`package.json`

如果本文档有遗漏或需更多示例（例如：如何实现 Notion 数据抓取的最小函数，或组件 prop 类型的确切定义），请指出需要补充的文件或用例，我将把具体代码片段补上。
