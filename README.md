# AIED Case Hub

AIED Case Hub 是一个可部署到 GitHub Pages 的静态 AI 教育案例库。页面读取 `data/cases.csv`，支持按栏目、学段、语言、地区、来源和 AI 类型筛选。

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
id,title_original,title_cn,category,subject,education_level,language,region,ai_tool_or_method,summary_cn,source_type,credibility,source_url,published_date,accessed_date
```

新增案例时请保留来源链接和访问日期。英文或繁体来源保留原题，并补充简体中文摘要。

## GitHub Pages

推荐设置：

- Repository name: `aied-case-hub`
- Pages source: `main` branch, root folder
- URL: `https://<GitHub用户名>.github.io/aied-case-hub/`
