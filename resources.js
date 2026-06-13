const RESOURCE_DATA_URL = "data/resources.csv";
const RESOURCE_PAGE_SIZE = 24;

const state = {
  resources: [],
  search: "",
  region: "全部",
  level: "全部",
  audience: "全部",
  resourceType: "全部",
  category: "全部",
  language: "全部",
  accessType: "全部",
  sort: "title-asc",
  page: 1,
};

const elements = {
  resources: document.querySelector("#resources"),
  empty: document.querySelector("#resourceEmptyState"),
  search: document.querySelector("#resourceSearchInput"),
  region: document.querySelector("#resourceRegionFilter"),
  level: document.querySelector("#resourceLevelFilter"),
  audience: document.querySelector("#resourceAudienceFilter"),
  resourceType: document.querySelector("#resourceTypeFilter"),
  category: document.querySelector("#resourceCategoryFilter"),
  language: document.querySelector("#resourceLanguageFilter"),
  accessType: document.querySelector("#resourceAccessFilter"),
  sort: document.querySelector("#resourceSortSelect"),
  reset: document.querySelector("#resourceResetFilters"),
  totalResources: document.querySelector("#totalResources"),
  regionCount: document.querySelector("#regionCount"),
  resourceTypeCount: document.querySelector("#resourceTypeCount"),
  lastAccessed: document.querySelector("#resourceLastAccessed"),
  resultsTitle: document.querySelector("#resourceResultsTitle"),
  resultsMeta: document.querySelector("#resourceResultsMeta"),
  pagination: document.querySelector("#resourcePagination"),
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

function uniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort((a, b) =>
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
    item.resource_type,
    item.category,
    item.subject,
    item.education_level,
    item.audience,
    item.language,
    item.region,
    item.publisher,
    item.summary_cn,
    item.use_case_cn,
    item.access_type,
  ]
    .join(" ")
    .toLowerCase();
}

function getFilteredResources() {
  const query = state.search.trim().toLowerCase();

  return state.resources
    .filter((item) => {
      const queryMatch = !query || getSearchText(item).includes(query);
      return (
        queryMatch &&
        matchesField(item.region, state.region) &&
        matchesField(item.education_level, state.level) &&
        matchesField(item.audience, state.audience) &&
        matchesField(item.resource_type, state.resourceType) &&
        matchesField(item.category, state.category) &&
        matchesField(item.language, state.language) &&
        matchesField(item.access_type, state.accessType)
      );
    })
    .sort((a, b) => {
      if (state.sort === "date-desc") return dateValue(b.published_date) - dateValue(a.published_date);
      if (state.sort === "date-asc") return dateValue(a.published_date) - dateValue(b.published_date);
      if (state.sort === "region-asc") return a.region.localeCompare(b.region, "zh-Hans-CN");
      if (state.sort === "publisher-asc") {
        return a.publisher.localeCompare(b.publisher, "zh-Hans-CN");
      }
      return a.title_cn.localeCompare(b.title_cn, "zh-Hans-CN");
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
  elements.resources.innerHTML = "";
  elements.empty.hidden = items.length > 0;

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "case-card resource-card";

    const topline = document.createElement("div");
    topline.className = "case-topline";
    topline.append(
      createTag(item.resource_type, "category"),
      createTag(item.region, item.region === "香港" ? "hk" : ""),
      createTag(item.access_type, "source")
    );

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
      createMeta("类别", item.category),
      createMeta("发布机构", item.publisher),
      createMeta("学段", item.education_level),
      createMeta("受众", item.audience),
      createMeta("语言", item.language),
      createMeta("学科/主题", item.subject)
    );

    const useBlock = document.createElement("div");
    useBlock.className = "workflow-block resource-use-block";
    const useHeader = document.createElement("div");
    useHeader.className = "workflow-header";
    const useTitle = document.createElement("h4");
    useTitle.textContent = "适用方式";
    useHeader.append(useTitle);
    const useText = document.createElement("p");
    useText.textContent = item.use_case_cn;
    useBlock.append(useHeader, useText);

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
    link.textContent = "打开资源";

    footer.append(date, link);
    card.append(topline, title, original, summary, meta, useBlock, footer);
    elements.resources.append(card);
  });
}

function resetPage() {
  state.page = 1;
}

function setPage(page) {
  state.page = page;
  render();
  elements.resources.scrollIntoView({ block: "start", behavior: "smooth" });
}

function renderPagination(totalItems) {
  elements.pagination.innerHTML = "";
  const totalPages = Math.max(1, Math.ceil(totalItems / RESOURCE_PAGE_SIZE));
  elements.pagination.hidden = totalItems <= RESOURCE_PAGE_SIZE;
  if (totalItems <= RESOURCE_PAGE_SIZE) return;

  const previous = document.createElement("button");
  previous.className = "page-button";
  previous.type = "button";
  previous.textContent = "上一页";
  previous.disabled = state.page === 1;
  previous.addEventListener("click", () => setPage(state.page - 1));

  const status = document.createElement("span");
  status.className = "page-status";
  status.textContent = `第 ${state.page} / ${totalPages} 页`;

  const next = document.createElement("button");
  next.className = "page-button";
  next.type = "button";
  next.textContent = "下一页";
  next.disabled = state.page === totalPages;
  next.addEventListener("click", () => setPage(state.page + 1));

  elements.pagination.append(previous, status, next);
}

function renderStats() {
  const accessedDates = state.resources.map((item) => item.accessed_date).filter(Boolean).sort();
  elements.totalResources.textContent = state.resources.length;
  elements.regionCount.textContent = uniqueValues(state.resources, "region").length;
  elements.resourceTypeCount.textContent = uniqueValues(state.resources, "resource_type").length;
  elements.lastAccessed.textContent = accessedDates.at(-1) || "--";
}

function render() {
  const items = getFilteredResources();
  const totalPages = Math.max(1, Math.ceil(items.length / RESOURCE_PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * RESOURCE_PAGE_SIZE;
  const pageItems = items.slice(start, start + RESOURCE_PAGE_SIZE);
  const firstItem = items.length === 0 ? 0 : start + 1;
  const lastItem = Math.min(start + RESOURCE_PAGE_SIZE, items.length);

  renderCards(pageItems);
  renderPagination(items.length);
  elements.resultsTitle.textContent =
    state.category === "全部" ? "全部资源" : `${state.category} 资源`;
  elements.resultsMeta.textContent =
    items.length === 0
      ? `显示 0 / ${state.resources.length} 条资源`
      : `显示 ${firstItem}-${lastItem} / ${items.length} 条资源（总库 ${state.resources.length} 条）`;
}

function setupControls() {
  fillSelect(elements.region, uniqueValues(state.resources, "region"));
  fillSelect(elements.level, uniqueValues(state.resources, "education_level"));
  fillSelect(elements.audience, uniqueValues(state.resources, "audience"));
  fillSelect(elements.resourceType, uniqueValues(state.resources, "resource_type"));
  fillSelect(elements.category, uniqueValues(state.resources, "category"));
  fillSelect(elements.language, uniqueValues(state.resources, "language"));
  fillSelect(elements.accessType, uniqueValues(state.resources, "access_type"));

  elements.search.addEventListener("input", (event) => {
    state.search = event.target.value;
    resetPage();
    render();
  });

  elements.region.addEventListener("change", (event) => {
    state.region = event.target.value;
    resetPage();
    render();
  });

  elements.level.addEventListener("change", (event) => {
    state.level = event.target.value;
    resetPage();
    render();
  });

  elements.audience.addEventListener("change", (event) => {
    state.audience = event.target.value;
    resetPage();
    render();
  });

  elements.resourceType.addEventListener("change", (event) => {
    state.resourceType = event.target.value;
    resetPage();
    render();
  });

  elements.category.addEventListener("change", (event) => {
    state.category = event.target.value;
    resetPage();
    render();
  });

  elements.language.addEventListener("change", (event) => {
    state.language = event.target.value;
    resetPage();
    render();
  });

  elements.accessType.addEventListener("change", (event) => {
    state.accessType = event.target.value;
    resetPage();
    render();
  });

  elements.sort.addEventListener("change", (event) => {
    state.sort = event.target.value;
    resetPage();
    render();
  });

  elements.reset.addEventListener("click", () => {
    state.search = "";
    state.region = "全部";
    state.level = "全部";
    state.audience = "全部";
    state.resourceType = "全部";
    state.category = "全部";
    state.language = "全部";
    state.accessType = "全部";
    state.sort = "title-asc";
    resetPage();
    elements.search.value = "";
    elements.region.value = "全部";
    elements.level.value = "全部";
    elements.audience.value = "全部";
    elements.resourceType.value = "全部";
    elements.category.value = "全部";
    elements.language.value = "全部";
    elements.accessType.value = "全部";
    elements.sort.value = "title-asc";
    render();
  });
}

async function loadResources() {
  try {
    const response = await fetch(RESOURCE_DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    state.resources = parseCsv(text);
    setupControls();
    renderStats();
    render();
  } catch (error) {
    elements.resultsTitle.textContent = "数据读取失败";
    elements.resultsMeta.textContent = `请确认 ${RESOURCE_DATA_URL} 可以访问。`;
    elements.empty.hidden = false;
    elements.empty.querySelector("h2").textContent = "无法读取 CSV";
    elements.empty.querySelector("p").textContent = error.message;
  }
}

loadResources();
