# AIED Case Hub

AIED Case Hub 是一个可部署到 GitHub Pages 的静态 AI 教育资料库。首页顶部使用醒目的选项卡展示教学案例、教材资源、Prompt 模板和 AI 助手，并在右上角提供英文、简体中文、繁体中文界面切换。页面分别读取 `data/cases.csv`、`data/resources.csv` 和 `data/prompts.csv`。

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

三个选项卡都默认每页显示 24 张卡片；筛选或搜索变化后会自动回到第 1 页。

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
2. 用保守关键词规则筛出可能属于课堂、课程、活动或学习任务的 AI 教育案例，新闻报道、官方博客、研究论文、教师实践和视频来源都可以进入候选池。
3. 把新增候选写入 `data/candidate_cases.csv`。
4. 自动推送候选分支，并在 Actions 运行摘要里生成“打开候选 PR”的链接。若仓库之后开启 Actions 自动创建 PR 权限，这一步也可以再改成全自动开 PR。
5. 人工打开候选 PR，审核候选后，把通过的行移动到 `data/cases.csv`，再合并 PR。

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
