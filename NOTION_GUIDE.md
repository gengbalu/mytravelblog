# Notion CMS 配置指南

本指南将帮助您配置 Notion 作为网站的内容管理系统（CMS）。

## 📋 概述

配置 Notion 后，您可以：
- 在 Notion 中管理旅伴列表
- 在 Notion 中撰写和发布故事
- 在 Notion 中管理照片画廊

> 💡 **注意**：Notion 配置是可选的。如果不配置，网站将使用 `src/data/` 目录下的本地数据。

---

## 🔑 步骤 1：创建 Notion Integration

1. 访问 [Notion Integrations](https://www.notion.so/my-integrations)
2. 点击 **+ New integration**
3. 填写信息：
   - **Name**: 旅行日记博客
   - **Logo**: 可选
   - **Associated workspace**: 选择您的工作空间
4. 点击 **Submit**
5. 复制 **Internal Integration Token**（以 `secret_` 开头）

---

## 📊 步骤 2：创建 Notion 数据库

### 2.1 旅伴数据库（Members）

创建一个新的数据库，包含以下列：

| 列名 | 类型 | 说明 |
|------|------|------|
| Name | Title | 成员名字 |
| Avatar | URL | 头像图片链接 |
| Role | Select | 角色（如：摄影师、美食家） |
| StoriesCount | Number | 发布的故事数量 |
| Order | Number | 显示顺序 |

### 2.2 故事数据库（Stories）

| 列名 | 类型 | 说明 |
|------|------|------|
| Title | Title | 故事标题 |
| Excerpt | Text | 摘要（简短描述） |
| Cover | Files & media 或 URL | 封面图片 |
| AuthorName | Text | 作者名字 |
| AuthorAvatar | URL | 作者头像链接 |
| Location | Text | 地点（如：日本 · 京都） |
| Date | Date | 发布日期 |
| Likes | Number | 点赞数 |
| Comments | Number | 评论数 |
| Tags | Multi-select | 标签 |
| Published | Checkbox | 是否发布 |

### 2.3 照片数据库（Photos）

| 列名 | 类型 | 说明 |
|------|------|------|
| Alt | Title | 图片描述 |
| Image | URL | 图片链接 |
| Location | Text | 拍摄地点 |
| Order | Number | 显示顺序 |

---

## 🔗 步骤 3：共享数据库给 Integration

**重要！** 每个数据库都需要与您的 Integration 共享：

1. 打开数据库页面
2. 点击右上角的 **•••** 菜单
3. 点击 **Connections** → **Connect to**
4. 选择您创建的 **旅行日记博客** integration
5. 对每个数据库重复此操作

---

## 📝 步骤 4：获取数据库 ID

每个数据库的 ID 可从 URL 获取：

```
https://www.notion.so/您的工作空间/数据库ID?v=...
                              ^^^^^^^^^^^^^^^^
                              复制这32位字符
```

例如：
```
https://www.notion.so/myworkspace/abc123def456...?v=xyz
```
数据库 ID 是 `abc123def456...`

---

## ⚙️ 步骤 5：配置环境变量

### 本地开发

编辑 `.env.local` 文件：

```env
SITE_PASSWORD=您的密码

# Notion 配置
NOTION_API_KEY=secret_您的API密钥
NOTION_MEMBERS_DB=旅伴数据库ID
NOTION_STORIES_DB=故事数据库ID
NOTION_PHOTOS_DB=照片数据库ID
```

### Cloudflare Pages

在 Cloudflare Pages 项目设置中添加相同的环境变量。

---

## ✅ 步骤 6：验证配置

1. 在 Notion 数据库中添加一些测试数据
2. 重启开发服务器：`npm run dev`
3. 访问网站，确认数据正确显示

---

## 🔄 数据优先级

系统会按以下优先级选择数据源：

1. 如果配置了 Notion 且数据库有内容 → 使用 Notion 数据
2. 如果 Notion 未配置或为空 → 使用本地 `src/data/` 数据

这意味着您可以：
- 只使用本地数据（不配置 Notion）
- 只使用 Notion（配置后清空本地数据）
- 混合使用（部分数据来自 Notion，部分来自本地）

---

## 💡 提示

1. **图片托管**：建议使用 Unsplash、Imgur 或其他图床服务托管图片
2. **备份**：定期导出 Notion 数据作为备份
3. **SEO**：在故事标题和摘要中使用关键词
