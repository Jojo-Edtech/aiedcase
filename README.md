# AIED Case Hub

AIED Case Hub 是一个可部署到 GitHub Pages 的静态 AI 教育资料库。首页顶部使用醒目的选项卡展示教学案例、教材资源、Prompt 模板、教师工具和 AI 助手，并在右上角提供英文、简体中文、繁体中文界面切换。页面分别读取 `data/cases.csv`、`data/resources.csv` 和 `data/prompts.csv`。

当前交互功能包括：

- 教学案例可打开同页详情视图，并生成可分享的 `#case=...` 链接。
- 教学案例、教材资源和 Prompt 模板都支持按“教师任务”筛选。
- 三类内容都支持本地收藏和“只看收藏”；收藏数据保存在浏览器 `localStorage`，不会写入仓库或上传服务器。
- 每张案例卡和案例详情页都保留原始来源链接，并提供可复制工作流。
- Prompt 模板页包含“我要做什么”任务入口，并在卡片上显示需要替换的输入变量。
- 教师工具页提供教学 Prompt 生成器、收藏备课包导出、课堂 AI 使用守则生成器和专项模板生成器；这些工具都在浏览器本地运行，不需要后端或 API。

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

资源数据在 `data/resources.csv`。字段固定为：

```text
id,title_original,title_cn,resource_type,category,subject,education_level,audience,language,region,publisher,summary_cn,use_case_cn,source_url,published_date,accessed_date,access_type
```

资源类型固定为：`课程/教材`、`教师指南`、`政策框架`、`课堂工具包`、`学生课程`、`资源目录`、`研究报告`。

访问方式固定为：`免费`、`需注册`、`付费/订阅`、`未知`。

Prompt 模板数据在 `data/prompts.csv`。字段固定为：

```text
id,title_cn,prompt_type,category,subject,education_level,audience,output_format,ai_tool_or_method,prompt_cn,use_case_cn,source_title,source_url,accessed_date
```

Prompt 类型固定为：`备课设计`、`教材生成`、`练习与作业`、`评价反馈`、`差异化支持`、`项目学习`、`课堂活动`、`家校沟通`、`学生支持`。

当前第一版 Prompt 模板约 120 条，覆盖 STEM、语言、人文、社会科学、艺术设计、商科、AI 素养、学生支持和教师工作流。案例、资源和 Prompt 三类数据列表都默认每页显示 24 张卡片；筛选、搜索或切换教师任务后会自动回到第 1 页。

## 教师工具

`教师工具` 选项卡是纯前端工具区，面向一线老师的快速备课场景：

- `教学 Prompt 生成器`：输入学科、学段、主题、课堂时间和学生情况后，生成可直接复制到任意生成式 AI 工具的教学 Prompt。
- `收藏备课包导出`：读取本机浏览器中收藏的教学案例、教材资源和 Prompt 模板，生成 Markdown 格式的备课清单。
- `课堂 AI 使用守则`：按学段、允许用途、评价方式和隐私规则生成学生可读的课堂 AI 使用规范。
- `专项模板生成器`：按评价量规、分层改写、反馈语、家校沟通、课堂提问、退出卡/小测等高频任务生成可复制 Prompt。

以上工具不上传老师输入的内容，也不会写入仓库；收藏数据只保存在本机浏览器 `localStorage` 中。

## AI 助手 / RAG

首页包含一个 `AI 助手` 选项卡，用来嵌入部署在 ModelScope Studio 或 Notebook 上的有限额 RAG 应用。

RAG 应用代码在 `modelscope_rag/`：

- `app.py`：Gradio 应用，启动时读取公开的案例、资源和 Prompt CSV。
- `requirements.txt`：ModelScope Studio 需要安装的依赖。
- `README.md`：部署到魔搭创空间或 Notebook 的步骤。

部署后，把魔搭 Studio 的公开访问地址填入 `data/rag-config.json` 的 `studio_url`。不要把 `MODELSCOPE_API_TOKEN`、阿里云 API Key 或其它密钥写入本仓库；密钥只应放在魔搭 Studio/Notebook 的环境变量中。

推荐在魔搭环境变量里设置：

```text
MODELSCOPE_API_TOKEN=你的魔搭访问令牌
RAG_DAILY_GENERATION_LIMIT=50
```

`RAG_DAILY_GENERATION_LIMIT` 是公开试用的每日生成上限。超过后，AI 助手会停止调用模型，只返回检索到的引用来源，避免继续消耗免费额度。

本地检查 RAG 检索：

```bash
python3 modelscope_rag/app.py --self-test
```

## 每日自动更新

仓库已配置两类 GitHub Actions：

- 每天香港时间 06:00 自动运行一次候选案例收集任务，也可以在 GitHub 的 `Actions -> Daily AIED Candidate Update -> Run workflow` 手动触发。
- 每天香港时间 06:05 自动刷新正式数据的 `accessed_date`，并推送到 `main`，让 GitHub Pages 上的“最近访问日期”保持为当天日期；也可以在 `Actions -> Daily Site Data Refresh -> Run workflow` 手动触发。

自动任务采用审核优先流程：

1. 从 `data/source_feeds.json` 中列出的教育与 AI 信息源抓取最新内容。当前支持 RSS、Atom 和 YouTube channel feed。
2. 对可能相关但摘要不足的条目，自动尝试打开原文页抽取正文；普通 HTML 抽取不足时，会尝试 Firecrawl 的轻量 `scrape/search` 接口作为 fallback。Firecrawl 失败、限流或 keyless 访问被拦截时不会中断任务。
3. 用保守关键词规则筛出可能属于课堂、课程、活动或学习任务的 AI 教育案例，新闻报道、官方博客、研究论文、教师实践和视频来源都可以进入候选池。
4. 把新增候选写入 `data/candidate_cases.csv`。
5. 自动推送候选分支，并在 Actions 运行摘要里生成“打开候选 PR”的链接。若仓库之后开启 Actions 自动创建 PR 权限，这一步也可以再改成全自动开 PR。
6. 人工打开候选 PR，审核候选后，把通过的行移动到 `data/cases.csv`，再合并 PR。

合并到 `main` 后，GitHub Pages 会自动刷新正式网页。这样前端页面和数据源都会保持同步，但不会让未经审核的候选案例直接上线。

本地运行：

```bash
npm run update:candidates
npm run validate:data
```

可选爬虫增强环境变量：

```text
ARTICLE_ENRICHMENT_ENABLED=false      # 关闭原文页正文抽取
ARTICLE_ENRICHMENT_MAX_PER_RUN=18     # 每次最多抽取多少篇原文
FIRECRAWL_ENABLED=false               # 关闭 Firecrawl fallback
FIRECRAWL_SEARCH_ENABLED=false        # 关闭 Firecrawl 搜索发现
FIRECRAWL_MAX_PER_RUN=6               # 每次最多调用 Firecrawl 多少次
FIRECRAWL_API_KEY=你的免费或付费 Key       # 可选；不写时尝试 keyless，用不了会自动降级
FIRECRAWL_SEARCH_QUERIES="query1||query2"
```

Actions 运行摘要会显示正文抽取数量、Firecrawl 调用数量、搜索结果数量和失败原因，方便判断当天自动更新是否真的抓到了新候选。

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

## 阿里云 OSS 镜像部署

仓库已加入 `.github/workflows/deploy-aliyun-oss.yml`，用于把同一份静态网站同步到阿里云 OSS。默认不会自动运行，等阿里云 Bucket 和 GitHub Secrets 配好后再开启。

推荐阿里云结构：

- OSS Bucket：存放当前静态网页。
- CDN：面向中国内地用户加速访问。
- 自定义域名：例如 `aied.yourdomain.com`，后续也方便在同一域名下挂更多网页。

阿里云侧先完成：

1. 创建 OSS Bucket，建议选择中国内地地域，例如华东 1（杭州）、华南 1（深圳）等。
2. 在 Bucket 中开启静态网站托管，默认首页设为 `index.html`。
3. 如果要使用中国内地 CDN 或中国内地 Bucket 绑定自定义域名，需要先完成 ICP 备案。
4. 创建一个 RAM 用户或 RAM 角色，只给目标 Bucket 的上传/读取权限，不要使用主账号 AccessKey。

GitHub 仓库中配置：

在 `Settings -> Secrets and variables -> Actions` 中加入 Secrets：

```text
ALIYUN_ACCESS_KEY_ID=你的 RAM AccessKey ID
ALIYUN_ACCESS_KEY_SECRET=你的 RAM AccessKey Secret
ALIYUN_OSS_BUCKET=你的 OSS Bucket 名称
ALIYUN_OSS_ENDPOINT=https://oss-cn-hangzhou.aliyuncs.com
ALIYUN_OSS_PREFIX=
```

`ALIYUN_OSS_PREFIX` 可以留空，表示部署到 Bucket 根目录；如果想放在子目录，例如 `aied-case-hub/`，就填 `aied-case-hub`。

再加入 Repository Variable：

```text
ALIYUN_DEPLOY_ENABLED=true
```

开启后，每次 `main` 分支更新网页文件或数据 CSV，GitHub Pages 会继续更新，同时会把 `dist/` 中的静态文件同步到阿里云 OSS。也可以在 GitHub 的 `Actions -> Deploy Static Site to Aliyun OSS -> Run workflow` 手动触发。

本地检查即将上传的静态文件：

```bash
npm run validate:data
npm run build:static
```

不要把阿里云 AccessKey 写入代码、README 或 CSV；只放在 GitHub Secrets 或阿里云环境变量中。
