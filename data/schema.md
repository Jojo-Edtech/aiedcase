# CSV Schema

`cases.csv` 是教学案例页的数据源。

`candidate_cases.csv` 使用同一套字段，用来暂存每日自动任务发现的候选案例。候选案例审核通过后，再移动到 `cases.csv` 上线。

| 字段 | 说明 |
| --- | --- |
| `id` | 稳定编号，例如 `case-001` |
| `title_original` | 原始标题，保留英文或繁体 |
| `title_cn` | 简体中文标题 |
| `category` | 5 个一级栏目之一：AI Literacy、AI+STEM、AI+Humanities、AI+Social Sciences、AI for Teaching & Assessment |
| `subcategory` | 一级栏目下的细分方向，例如 Math、Science、Coding / CS、Language、Arts & Design、Business / Economics |
| `subject` | 更具体的学科或主题 |
| `education_level` | 小学、初中、高中、大学、教师教育、中小学、高等教育等 |
| `language` | 来源主要语言 |
| `region` | 案例地区 |
| `ai_tool_or_method` | AI 类型或方法 |
| `summary_cn` | 简体中文摘要 |
| `workflow_cn` | 可复制的课堂 skill / 工作流 |
| `source_type` | 课程资源、研究论文、学校案例、教师实践、媒体报道、视频案例 |
| `credibility` | 官方/学校、论文/研究、教师实践、媒体报道 |
| `source_url` | 原始来源链接 |
| `published_date` | 来源发布日期，未知时尽量填年份 |
| `accessed_date` | 访问日期 |

## resources.csv

`resources.csv` 是“全球资源与教材”分页的数据源，用来收录 AI 教育网页、课程、教材、框架、工具包和研究报告。

| 字段 | 说明 |
| --- | --- |
| `id` | 稳定编号，例如 `resource-001` |
| `title_original` | 原始标题，保留英文或繁体 |
| `title_cn` | 简体中文标题 |
| `resource_type` | 固定标签：课程/教材、教师指南、政策框架、课堂工具包、学生课程、资源目录、研究报告 |
| `category` | 5 个一级栏目之一：AI Literacy、AI+STEM、AI+Humanities、AI+Social Sciences、AI for Teaching & Assessment |
| `subject` | 更具体的学科或主题 |
| `education_level` | 小学、初中、高中、大学、教师教育、中小学、高等教育等 |
| `audience` | 目标读者，例如教师、学生、学校领导、课程设计者 |
| `language` | 来源主要语言 |
| `region` | 地区或组织来源 |
| `publisher` | 发布机构 |
| `summary_cn` | 简体中文简介 |
| `use_case_cn` | 适用方式或可直接借鉴的使用建议 |
| `source_url` | 原始来源链接 |
| `published_date` | 来源发布日期，未知时尽量填年份 |
| `accessed_date` | 访问日期 |
| `access_type` | 固定标签：免费、需注册、付费/订阅、未知 |

## prompts.csv

`prompts.csv` 是“Prompt 模板”选项卡的数据源，用来收录教师可直接复制、再按学科和学段改写的 AI 提示词模板。

| 字段 | 说明 |
| --- | --- |
| `id` | 稳定编号，例如 `prompt-001` |
| `title_cn` | 简体中文标题 |
| `prompt_type` | 固定标签：备课设计、教材生成、练习与作业、评价反馈、差异化支持、项目学习、课堂活动、家校沟通、学生支持 |
| `category` | 5 个一级栏目之一：AI Literacy、AI+STEM、AI+Humanities、AI+Social Sciences、AI for Teaching & Assessment |
| `subject` | 学科或主题，例如 Math、Science、Language、Coding / CS、Business / Economics |
| `education_level` | 适用学段 |
| `audience` | 目标使用者 |
| `output_format` | 预期生成物，例如课时教案、评价量规、学习单、项目任务书 |
| `ai_tool_or_method` | 适用的 AI 工具或方法 |
| `prompt_cn` | 可复制 Prompt 正文 |
| `use_case_cn` | 使用场景简介 |
| `source_title` | 参考来源标题 |
| `source_url` | 参考来源链接 |
| `accessed_date` | 访问日期 |
