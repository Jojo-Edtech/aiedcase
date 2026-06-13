# AIED Case Hub

AIED Case Hub 是一个可部署到 GitHub Pages 的静态 AI 教育案例库。页面读取 `data/cases.csv`，支持按一级栏目、细分方向、学段、语言、地区、来源和 AI 类型筛选。

## 本地预览

在项目目录运行：

```bash
python3 -m http.server 4173
```

然后打开：

```text
http://localhost:4173
```

## 数据维护

案例数据在 `data/cases.csv`。字段固定为：

```text
id,title_original,title_cn,category,subcategory,subject,education_level,language,region,ai_tool_or_method,summary_cn,workflow_cn,source_type,credibility,source_url,published_date,accessed_date
```

一级栏目当前为：`AI Literacy`、`AI+STEM`、`AI+Humanities`、`AI+Social Sciences`、`AI for Teaching & Assessment`。

新增案例时请保留来源链接和访问日期。英文或繁体来源保留原题，并补充简体中文摘要。`workflow_cn` 用来保存可复制的课堂 skill / 工作流，方便读者直接改写使用。

## 每日自动更新

仓库已配置 GitHub Actions：每天香港时间 06:00 自动运行一次候选案例收集任务，也可以在 GitHub 的 `Actions -> Daily AIED Candidate Update -> Run workflow` 手动触发。

自动任务采用审核优先流程：

1. 从 `data/source_feeds.json` 中列出的教育与 AI 信息源抓取最新内容。当前支持 RSS、Atom 和 YouTube channel feed。
2. 用保守关键词规则筛出可能属于课堂、课程、活动或学习任务的 AI 教育案例，新闻报道、官方博客、研究论文、教师实践和视频来源都可以进入候选池。
3. 把新增候选写入 `data/candidate_cases.csv`。
4. 自动创建或更新 `Daily AIED candidate case update` Pull Request。
5. 人工审核候选后，把通过的行移动到 `data/cases.csv`，再合并 PR。

合并到 `main` 后，GitHub Pages 会自动刷新正式网页。这样前端页面和数据源都会保持同步，但不会让未经审核的候选案例直接上线。

本地运行：

```bash
npm run update:candidates
npm run validate:data
```

Bilibili 搜索源目前不放入每日无人值守任务，因为常见公开 RSSHub 搜索接口在 GitHub Actions 环境中容易返回 403/503。相关视频案例可以先人工审核后加入 `data/cases.csv`。

## GitHub Pages

推荐设置：

- Repository name: `aied-case-hub`
- Pages source: `main` branch, root folder
- URL: `https://jojo-edtech.github.io/aied-case-hub/`

如果 GitHub 上已经创建好空仓库，可以在本地运行：

```bash
git remote add origin git@github.com:Jojo-Edtech/aied-case-hub.git
git push -u origin main
```

然后进入 GitHub 仓库的 `Settings -> Pages`，选择 `Deploy from a branch`，分支选择 `main`，目录选择 `/root`。
