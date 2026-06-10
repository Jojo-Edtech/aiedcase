# CSV Schema

`cases.csv` 是网站唯一的数据源。

`candidate_cases.csv` 使用同一套字段，用来暂存每日自动任务发现的候选案例。候选案例审核通过后，再移动到 `cases.csv` 上线。

| 字段 | 说明 |
| --- | --- |
| `id` | 稳定编号，例如 `case-001` |
| `title_original` | 原始标题，保留英文或繁体 |
| `title_cn` | 简体中文标题 |
| `category` | 10 个一级栏目之一 |
| `subject` | 更具体的学科或主题 |
| `education_level` | 小学、初中、高中、大学、教师教育、中小学、高等教育等 |
| `language` | 来源主要语言 |
| `region` | 案例地区 |
| `ai_tool_or_method` | AI 类型或方法 |
| `summary_cn` | 简体中文摘要 |
| `source_type` | 课程资源、研究论文、学校案例、教师实践、媒体报道 |
| `credibility` | 官方/学校、论文/研究、教师实践、媒体报道 |
| `source_url` | 原始来源链接 |
| `published_date` | 来源发布日期，未知时尽量填年份 |
| `accessed_date` | 访问日期 |
