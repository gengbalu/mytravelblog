# Cloudflare Pages 部署指南

本指南将帮助您将旅行日记博客部署到 Cloudflare Pages。

## 📋 前置准备

1. ✅ Cloudflare 账号（您已有）
2. ✅ 托管在 Cloudflare 的域名（您已有）
3. 📦 项目代码（本地已准备好）

---

## 🚀 部署步骤

### 步骤 1：推送代码到 GitHub

首先需要将项目代码推送到 GitHub 仓库：

```bash
# 在项目根目录执行
cd d:\MyTravelBlog

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 旅行日记博客"

# 添加远程仓库（替换为您的 GitHub 仓库地址）
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送
git push -u origin main
```

### 步骤 2：连接 Cloudflare Pages

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击左侧菜单的 **Workers & Pages**
3. 点击 **Create application** → **Pages** → **Connect to Git**
4. 选择 GitHub，授权访问您的仓库
5. 选择刚才推送的仓库

### 步骤 3：配置构建设置

在 Cloudflare Pages 设置页面：

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | Next.js |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | `.open-next/assets` |
| **Root directory** | `/` |

### 步骤 4：配置环境变量 ⚠️ 重要！

在 **Environment variables** 部分添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `SITE_PASSWORD` | `您的密码` | 网站访问密码 |
| `NODE_VERSION` | `18` | Node.js 版本 |

> ⚠️ **安全提示**：请将 `SITE_PASSWORD` 修改为您自己的强密码！

**如果配置了 Notion（可选）**：

| 变量名 | 值 |
|--------|-----|
| `NOTION_API_KEY` | 您的 Notion API Key |
| `NOTION_MEMBERS_DB` | 旅伴数据库 ID |
| `NOTION_STORIES_DB` | 故事数据库 ID |
| `NOTION_PHOTOS_DB` | 照片数据库 ID |

### 步骤 5：部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约 2-5 分钟）
3. 部署成功后，您将获得一个 `.pages.dev` 域名

### 步骤 6：绑定自定义域名

1. 在 Pages 项目页面，点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入您的域名（例如：`travel.yourdomain.com`）
4. 由于域名已托管在 Cloudflare，DNS 会自动配置
5. 等待 SSL 证书生成（通常几分钟）

---

## 🔄 后续更新

每次您推送代码到 GitHub，Cloudflare Pages 会自动重新部署：

```bash
git add .
git commit -m "更新内容"
git push
```

---

## 🔧 故障排除

### 构建失败

1. 检查 `NODE_VERSION` 环境变量是否设置为 `18`
2. 查看构建日志中的错误信息
3. 确保所有依赖都在 `package.json` 中

### 登录问题

1. 确认 `SITE_PASSWORD` 环境变量已正确设置
2. 清除浏览器缓存后重试

### Notion 数据不显示

1. 确认 Notion API Key 有正确的权限
2. 确认数据库 ID 正确
3. 确认 Notion 数据库已与集成共享

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 Cloudflare Pages 的构建日志
2. 检查浏览器控制台的错误信息
3. 确认所有环境变量都已正确配置
