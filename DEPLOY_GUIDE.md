# Cloudflare Pages 部署指南

本指南将帮助您将旅行日记博客部署到 Cloudflare Pages。

## 📋 前置准备

1. ✅ Cloudflare 账号
2. ✅ GitHub 账号
3. ✅ 托管在 Cloudflare 的域名（可选）

---

## 🚀 部署步骤

### 步骤 1：推送代码到 GitHub

```bash
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
3. 点击 **Create** → **Pages** → **Connect to Git**
4. 选择 GitHub，授权访问您的仓库
5. 选择刚才推送的仓库

### 步骤 3：配置构建设置 ⚠️ 重要！

在构建配置页面设置：

| 设置项 | 值 |
|--------|-----|
| **Framework preset** | None |
| **Build command** | `npm run build:cloudflare` |
| **Build output directory** | `.open-next` |
| **Root directory** | `/` （留空） |

### 步骤 4：配置环境变量

在 **Environment variables** 部分添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `SITE_PASSWORD` | `您的密码` | 网站访问密码 **必填** |
| `NODE_VERSION` | `18` | Node.js 版本 **必填** |

**如需 Notion 集成（可选）**：

| 变量名 | 值 |
|--------|-----|
| `NOTION_API_KEY` | 您的 Notion Integration Token |
| `NOTION_MEMBERS_DB` | 旅伴数据库 ID |
| `NOTION_STORIES_DB` | 故事数据库 ID |
| `NOTION_PHOTOS_DB` | 照片数据库 ID |

### 步骤 5：部署

1. 点击 **Save and Deploy**
2. 等待构建完成（约 3-5 分钟）
3. 部署成功后获得 `.pages.dev` 域名

### 步骤 6：绑定自定义域名（可选）

1. 在 Pages 项目页面，点击 **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入您的域名（如 `travel.yourdomain.com`）
4. DNS 会自动配置（域名已在 Cloudflare）

---

## 🔄 后续更新

每次推送代码会自动重新部署：

```bash
git add .
git commit -m "更新说明"
git push
```

---

## 🔧 故障排除

### 构建失败
- 确认 `NODE_VERSION` 设置为 `18`
- 确认 Build command 为 `npm run build:cloudflare`
- 确认 Build output directory 为 `.open-next`

### 登录问题
- 确认 `SITE_PASSWORD` 已设置
- 清除浏览器缓存后重试

### 页面 404
- 检查是否正确设置了 Build output directory
- 查看 Cloudflare 构建日志
