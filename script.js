const DATA_URL = "data/cases.csv";

const CATEGORIES = [
  "AI Literacy",
  "AI+STEM",
  "AI+Math",
  "AI+Science",
  "AI+Coding / CS",
  "AI+Language",
  "AI+Humanities & Social Studies",
  "AI+Arts & Design",
  "AI+Business / Economics",
  "AI for Teaching & Assessment",
];

const state = {
  cases: [],
  category: "全部",
  search: "",
  level: "全部",
  language: "全部",
  region: "全部",
  source: "全部",
  method: "全部",
  sort: "date-desc",
};

const elements = {
  tabs: document.querySelector("#categoryTabs"),
  cases: document.querySelector("#cases"),
  empty: document.querySelector("#emptyState"),
  search: document.querySelector("#searchInput"),
  level: document.querySelector("#levelFilter"),
  language: document.querySelector("#languageFilter"),
  region: document.querySelector("#regionFilter"),
  source: document.querySelector("#sourceFilter"),
  method: document.querySelector("#methodFilter"),
  sort: document.querySelector("#sortSelect"),
  reset: document.querySelector("#resetFilters"),
  totalCases: document.querySelector("#totalCases"),
  hongKongCases: document.querySelector("#hongKongCases"),
  categoryCount: document.querySelector("#categoryCount"),
  lastAccessed: document.querySelector("#lastAccessed"),
  resultsTitle: document.querySelector("#resultsTitle"),
  resultsMeta: document.querySelector("#resultsMeta"),
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift().map((header) => header.trim());
  return rows.map((values) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = (values[index] || "").trim();
    });
    return item;
  });
}

function uniqueValues(cases, key) {
  return [...new Set(cases.map((item) => item[key]).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-Hans-CN")
  );
}

function fillSelect(select, values) {
  select.innerHTML = "";
  ["全部", ...values].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  });
}

function dateValue(value) {
  if (!value) return 0;
  const normalized = value.length === 4 ? `${value}-01-01` : value;
  const timestamp = Date.parse(normalized);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function matchesField(value, selected) {
  return selected === "全部" || value === selected;
}

function getSearchText(item) {
  return [
    item.title_original,
    item.title_cn,
    item.category,
    item.subject,
    item.education_level,
    item.language,
    item.region,
    item.ai_tool_or_method,
    item.summary_cn,
    item.source_type,
    item.credibility,
  ]
    .join(" ")
    .toLowerCase();
}

function getFilteredCases() {
  const query = state.search.trim().toLowerCase();

  return state.cases
    .filter((item) => {
      const categoryMatch = state.category === "全部" || item.category === state.category;
      const queryMatch = !query || getSearchText(item).includes(query);
      return (
        categoryMatch &&
        queryMatch &&
        matchesField(item.education_level, state.level) &&
        matchesField(item.language, state.language) &&
        matchesField(item.region, state.region) &&
        matchesField(item.source_type, state.source) &&
        matchesField(item.ai_tool_or_method, state.method)
      );
    })
    .sort((a, b) => {
      if (state.sort === "date-asc") return dateValue(a.published_date) - dateValue(b.published_date);
      if (state.sort === "title-asc") return a.title_cn.localeCompare(b.title_cn, "zh-Hans-CN");
      if (state.sort === "region-asc") return a.region.localeCompare(b.region, "zh-Hans-CN");
      return dateValue(b.published_date) - dateValue(a.published_date);
    });
}

function createTag(text, extraClass = "") {
  const tag = document.createElement("span");
  tag.className = `tag ${extraClass}`.trim();
  tag.textContent = text;
  return tag;
}

function createMeta(label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value || "未标注";
  wrapper.append(term, description);
  return wrapper;
}

function renderCards(items) {
  elements.cases.innerHTML = "";
  elements.empty.hidden = items.length > 0;

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "case-card";

    const topline = document.createElement("div");
    topline.className = "case-topline";
    topline.append(createTag(item.category, "category"));
    if (item.region === "香港") topline.append(createTag("香港", "hk"));
    topline.append(createTag(item.credibility, "source"));

    const title = document.createElement("h3");
    title.textContent = item.title_cn || item.title_original;

    const original = document.createElement("p");
    original.className = "original-title";
    original.textContent = item.title_original && item.title_original !== item.title_cn
      ? item.title_original
      : item.subject;

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = item.summary_cn;

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta("学段", item.education_level),
      createMeta("语言", item.language),
      createMeta("地区", item.region),
      createMeta("AI类型", item.ai_tool_or_method)
    );

    const footer = document.createElement("div");
    footer.className = "card-footer";
    const date = document.createElement("span");
    date.className = "date";
    date.textContent = `发布：${item.published_date || "未标注"} · 访问：${item.accessed_date}`;

    const link = document.createElement("a");
    link.className = "source-link";
    link.href = item.source_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "查看来源";

    footer.append(date, link);
    card.append(topline, title, original, summary, meta, footer);
    elements.cases.append(card);
  });
}

function renderTabs() {
  elements.tabs.innerHTML = "";
  ["全部", ...CATEGORIES].forEach((category) => {
    const button = document.createElement("button");
    button.className = "tab";
    button.type = "button";
    button.setAttribute("aria-selected", category === state.category ? "true" : "false");
    button.textContent = category;
    button.addEventListener("click", () => {
      state.category = category;
      render();
    });
    elements.tabs.append(button);
  });
}

function renderStats() {
  const hongKongCount = state.cases.filter((item) => item.region === "香港").length;
  const accessedDates = state.cases.map((item) => item.accessed_date).filter(Boolean).sort();
  elements.totalCases.textContent = state.cases.length;
  elements.hongKongCases.textContent = hongKongCount;
  elements.categoryCount.textContent = CATEGORIES.length;
  elements.lastAccessed.textContent = accessedDates.at(-1) || "--";
}

function render() {
  const items = getFilteredCases();
  renderTabs();
  renderCards(items);
  elements.resultsTitle.textContent = state.category === "全部" ? "全部案例" : state.category;
  elements.resultsMeta.textContent = `显示 ${items.length} / ${state.cases.length} 条案例`;
}

function setupControls() {
  fillSelect(elements.level, uniqueValues(state.cases, "education_level"));
  fillSelect(elements.language, uniqueValues(state.cases, "language"));
  fillSelect(elements.region, uniqueValues(state.cases, "region"));
  fillSelect(elements.source, uniqueValues(state.cases, "source_type"));
  fillSelect(elements.method, uniqueValues(state.cases, "ai_tool_or_method"));

  elements.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    render();
  });

  elements.level.addEventListener("change", (event) => {
    state.level = event.target.value;
    render();
  });

  elements.language.addEventListener("change", (event) => {
    state.language = event.target.value;
    render();
  });

  elements.region.addEventListener("change", (event) => {
    state.region = event.target.value;
    render();
  });

  elements.source.addEventListener("change", (event) => {
    state.source = event.target.value;
    render();
  });

  elements.method.addEventListener("change", (event) => {
    state.method = event.target.value;
    render();
  });

  elements.sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    render();
  });

  elements.reset.addEventListener("click", () => {
    state.category = "全部";
    state.search = "";
    state.level = "全部";
    state.language = "全部";
    state.region = "全部";
    state.source = "全部";
    state.method = "全部";
    state.sort = "date-desc";
    elements.search.value = "";
    elements.level.value = "全部";
    elements.language.value = "全部";
    elements.region.value = "全部";
    elements.source.value = "全部";
    elements.method.value = "全部";
    elements.sort.value = "date-desc";
    render();
  });
}

async function loadCases() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    state.cases = parseCsv(text);
    setupControls();
    renderStats();
    render();
  } catch (error) {
    elements.resultsTitle.textContent = "数据读取失败";
    elements.resultsMeta.textContent = `请确认 ${DATA_URL} 可以访问。`;
    elements.empty.hidden = false;
    elements.empty.querySelector("h2").textContent = "无法读取 CSV";
    elements.empty.querySelector("p").textContent = error.message;
  }
}

loadCases();
