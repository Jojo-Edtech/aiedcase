const PAGE_SIZE = 24;
const DATA_URLS = {
  cases: "data/cases.csv",
  resources: "data/resources.csv",
  prompts: "data/prompts.csv",
};
const RAG_CONFIG_URL = "data/rag-config.json";
const VIEWS = ["cases", "resources", "prompts", "assistant"];

const CATEGORIES = [
  "AI Literacy",
  "AI+STEM",
  "AI+Humanities",
  "AI+Social Sciences",
  "AI for Teaching & Assessment",
];

const viewState = {
  active: "cases",
};

const caseState = {
  items: [],
  category: "全部",
  subcategory: "全部",
  search: "",
  level: "全部",
  language: "全部",
  region: "全部",
  source: "全部",
  method: "全部",
  sort: "date-desc",
  page: 1,
};

const resourceState = {
  items: [],
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

const promptState = {
  items: [],
  search: "",
  subject: "全部",
  level: "全部",
  promptType: "全部",
  category: "全部",
  audience: "全部",
  outputFormat: "全部",
  sort: "subject-asc",
  page: 1,
};

const viewElements = {
  tabs: [...document.querySelectorAll("[data-view]")],
  panels: [...document.querySelectorAll("[data-view-panel]")],
  caseTabCount: document.querySelector("#caseTabCount"),
  resourceTabCount: document.querySelector("#resourceTabCount"),
  promptTabCount: document.querySelector("#promptTabCount"),
  assistantTabStatus: document.querySelector("#assistantTabStatus"),
};

const caseEls = {
  tabs: document.querySelector("#categoryTabs"),
  cards: document.querySelector("#cases"),
  empty: document.querySelector("#emptyState"),
  search: document.querySelector("#searchInput"),
  subcategory: document.querySelector("#subcategoryFilter"),
  level: document.querySelector("#levelFilter"),
  language: document.querySelector("#languageFilter"),
  region: document.querySelector("#regionFilter"),
  source: document.querySelector("#sourceFilter"),
  method: document.querySelector("#methodFilter"),
  sort: document.querySelector("#sortSelect"),
  reset: document.querySelector("#resetFilters"),
  total: document.querySelector("#totalCases"),
  hongKong: document.querySelector("#hongKongCases"),
  categoryCount: document.querySelector("#categoryCount"),
  lastAccessed: document.querySelector("#lastAccessed"),
  resultsTitle: document.querySelector("#resultsTitle"),
  resultsMeta: document.querySelector("#resultsMeta"),
  pagination: document.querySelector("#casePagination"),
};

const resourceEls = {
  cards: document.querySelector("#resources"),
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
  total: document.querySelector("#totalResources"),
  regionCount: document.querySelector("#regionCount"),
  resourceTypeCount: document.querySelector("#resourceTypeCount"),
  lastAccessed: document.querySelector("#resourceLastAccessed"),
  resultsTitle: document.querySelector("#resourceResultsTitle"),
  resultsMeta: document.querySelector("#resourceResultsMeta"),
  pagination: document.querySelector("#resourcePagination"),
};

const promptEls = {
  cards: document.querySelector("#prompts"),
  empty: document.querySelector("#promptEmptyState"),
  search: document.querySelector("#promptSearchInput"),
  subject: document.querySelector("#promptSubjectFilter"),
  level: document.querySelector("#promptLevelFilter"),
  promptType: document.querySelector("#promptTypeFilter"),
  category: document.querySelector("#promptCategoryFilter"),
  audience: document.querySelector("#promptAudienceFilter"),
  outputFormat: document.querySelector("#promptOutputFilter"),
  sort: document.querySelector("#promptSortSelect"),
  reset: document.querySelector("#promptResetFilters"),
  total: document.querySelector("#totalPrompts"),
  subjectCount: document.querySelector("#promptSubjectCount"),
  promptTypeCount: document.querySelector("#promptTypeCount"),
  lastAccessed: document.querySelector("#promptLastAccessed"),
  resultsTitle: document.querySelector("#promptResultsTitle"),
  resultsMeta: document.querySelector("#promptResultsMeta"),
  pagination: document.querySelector("#promptPagination"),
};

const assistantEls = {
  frameWrap: document.querySelector("#assistantFrameWrap"),
  frame: document.querySelector("#assistantFrame"),
  empty: document.querySelector("#assistantEmptyState"),
  emptyTitle: document.querySelector("#assistantEmptyTitle"),
  emptyCopy: document.querySelector("#assistantEmptyCopy"),
  directLink: document.querySelector("#assistantDirectLink"),
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

function createCopyButton(text, label) {
  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "已复制";
    } catch {
      button.textContent = "复制失败";
    }
    window.setTimeout(() => {
      button.textContent = label;
    }, 1600);
  });
  return button;
}

function renderPagination(totalItems, state, elements, render, target) {
  elements.pagination.innerHTML = "";
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  elements.pagination.hidden = totalItems <= PAGE_SIZE;
  if (totalItems <= PAGE_SIZE) return;

  const previous = document.createElement("button");
  previous.className = "page-button";
  previous.type = "button";
  previous.textContent = "上一页";
  previous.disabled = state.page === 1;
  previous.addEventListener("click", () => {
    state.page -= 1;
    render();
    target.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  const status = document.createElement("span");
  status.className = "page-status";
  status.textContent = `第 ${state.page} / ${totalPages} 页`;

  const next = document.createElement("button");
  next.className = "page-button";
  next.type = "button";
  next.textContent = "下一页";
  next.disabled = state.page === totalPages;
  next.addEventListener("click", () => {
    state.page += 1;
    render();
    target.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  elements.pagination.append(previous, status, next);
}

function pageSlice(items, state) {
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * PAGE_SIZE;
  return {
    items: items.slice(start, start + PAGE_SIZE),
    first: items.length === 0 ? 0 : start + 1,
    last: Math.min(start + PAGE_SIZE, items.length),
  };
}

function setActiveView(view, updateHash = true) {
  const nextView = VIEWS.includes(view) ? view : "cases";
  viewState.active = nextView;
  viewElements.tabs.forEach((tab) => {
    const active = tab.dataset.view === nextView;
    if (active) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
  viewElements.panels.forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== nextView;
  });
  if (updateHash && window.location.hash !== `#${nextView}`) {
    history.replaceState(null, "", `#${nextView}`);
  }
}

function showAssistantEmpty(title, copy) {
  assistantEls.frameWrap.hidden = true;
  assistantEls.frame.removeAttribute("src");
  assistantEls.empty.hidden = false;
  assistantEls.emptyTitle.textContent = title;
  assistantEls.emptyCopy.textContent = copy;
  assistantEls.directLink.hidden = true;
  viewElements.assistantTabStatus.textContent = "待连接";
}

function renderAssistant(studioUrl) {
  const url = (studioUrl || "").trim();
  if (!url) {
    showAssistantEmpty("AI 助手待连接", "魔搭 Studio 应用地址配置后，这里会显示有限额 RAG 问答窗口。");
    return;
  }

  assistantEls.frame.src = url;
  assistantEls.frameWrap.hidden = false;
  assistantEls.empty.hidden = true;
  assistantEls.directLink.href = url;
  assistantEls.directLink.hidden = false;
  viewElements.assistantTabStatus.textContent = "已连接";
}

async function initAssistant() {
  try {
    const response = await fetch(RAG_CONFIG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const config = await response.json();
    renderAssistant(config.studio_url);
  } catch (error) {
    showAssistantEmpty("AI 助手配置读取失败", `请确认 ${RAG_CONFIG_URL} 可以访问。`);
  }
}

function setupViewTabs() {
  viewElements.tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      setActiveView(tab.dataset.view);
    });
  });

  window.addEventListener("hashchange", () => {
    setActiveView(window.location.hash.replace("#", ""), false);
  });

  setActiveView(window.location.hash.replace("#", "") || "cases", false);
}

function caseSearchText(item) {
  return [
    item.title_original,
    item.title_cn,
    item.category,
    item.subcategory,
    item.subject,
    item.education_level,
    item.language,
    item.region,
    item.ai_tool_or_method,
    item.summary_cn,
    item.workflow_cn,
    item.source_type,
    item.credibility,
  ]
    .join(" ")
    .toLowerCase();
}

function filteredCases() {
  const query = caseState.search.trim().toLowerCase();
  return caseState.items
    .filter((item) => {
      return (
        (caseState.category === "全部" || item.category === caseState.category) &&
        (caseState.subcategory === "全部" || item.subcategory === caseState.subcategory) &&
        (!query || caseSearchText(item).includes(query)) &&
        matchesField(item.education_level, caseState.level) &&
        matchesField(item.language, caseState.language) &&
        matchesField(item.region, caseState.region) &&
        matchesField(item.source_type, caseState.source) &&
        matchesField(item.ai_tool_or_method, caseState.method)
      );
    })
    .sort((a, b) => {
      if (caseState.sort === "date-asc") return dateValue(a.published_date) - dateValue(b.published_date);
      if (caseState.sort === "title-asc") return a.title_cn.localeCompare(b.title_cn, "zh-Hans-CN");
      if (caseState.sort === "region-asc") return a.region.localeCompare(b.region, "zh-Hans-CN");
      return dateValue(b.published_date) - dateValue(a.published_date);
    });
}

function caseSubcategories() {
  const source =
    caseState.category === "全部"
      ? caseState.items
      : caseState.items.filter((item) => item.category === caseState.category);
  return uniqueValues(source, "subcategory");
}

function workflowText(item) {
  if (item.workflow_cn) return item.workflow_cn;
  return [
    `案例：${item.title_cn || item.title_original}`,
    `目标：围绕${item.subject || item.subcategory || item.category}设计一节AI辅助学习活动。`,
    `流程：1. 给学生一个真实问题；2. 用${item.ai_tool_or_method || "AI工具"}生成、比较或反馈；3. 让学生记录判断依据；4. 分享作品并反思AI的帮助和局限。`,
    `产出：一份学习作品、一段反思或一张评价表。`,
  ].join("\n");
}

function renderCaseCards(items) {
  caseEls.cards.innerHTML = "";
  caseEls.empty.hidden = items.length > 0;
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
    original.textContent =
      item.title_original && item.title_original !== item.title_cn ? item.title_original : item.subject;

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = item.summary_cn;

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta("细分", item.subcategory),
      createMeta("学段", item.education_level),
      createMeta("语言", item.language),
      createMeta("地区", item.region),
      createMeta("AI类型", item.ai_tool_or_method)
    );

    const workflow = workflowText(item);
    const workflowBlock = document.createElement("div");
    workflowBlock.className = "workflow-block";
    const workflowHeader = document.createElement("div");
    workflowHeader.className = "workflow-header";
    const workflowTitle = document.createElement("h4");
    workflowTitle.textContent = "可复制工作流";
    workflowHeader.append(workflowTitle, createCopyButton(workflow, "复制工作流"));
    const workflowContent = document.createElement("pre");
    workflowContent.textContent = workflow;
    workflowBlock.append(workflowHeader, workflowContent);

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
    card.append(topline, title, original, summary, meta, workflowBlock, footer);
    caseEls.cards.append(card);
  });
}

function renderCaseTabs() {
  caseEls.tabs.innerHTML = "";
  ["全部", ...CATEGORIES].forEach((category) => {
    const button = document.createElement("button");
    button.className = "tab";
    button.type = "button";
    button.setAttribute("aria-selected", category === caseState.category ? "true" : "false");
    button.textContent = category;
    button.addEventListener("click", () => {
      caseState.category = category;
      caseState.subcategory = "全部";
      caseState.page = 1;
      fillSelect(caseEls.subcategory, caseSubcategories());
      renderCases();
    });
    caseEls.tabs.append(button);
  });
}

function renderCaseStats() {
  const accessedDates = caseState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  caseEls.total.textContent = caseState.items.length;
  viewElements.caseTabCount.textContent = `${caseState.items.length} 条案例`;
  caseEls.hongKong.textContent = caseState.items.filter((item) => item.region === "香港").length;
  caseEls.categoryCount.textContent = CATEGORIES.length;
  caseEls.lastAccessed.textContent = accessedDates.at(-1) || "--";
}

function renderCases() {
  const items = filteredCases();
  const page = pageSlice(items, caseState);
  renderCaseTabs();
  renderCaseCards(page.items);
  renderPagination(items.length, caseState, caseEls, renderCases, caseEls.cards);
  caseEls.resultsTitle.textContent = caseState.category === "全部" ? "全部案例" : caseState.category;
  caseEls.resultsMeta.textContent =
    items.length === 0
      ? `显示 0 / ${caseState.items.length} 条案例`
      : `显示 ${page.first}-${page.last} / ${items.length} 条案例（总库 ${caseState.items.length} 条）`;
}

function setupCaseControls() {
  fillSelect(caseEls.subcategory, caseSubcategories());
  fillSelect(caseEls.level, uniqueValues(caseState.items, "education_level"));
  fillSelect(caseEls.language, uniqueValues(caseState.items, "language"));
  fillSelect(caseEls.region, uniqueValues(caseState.items, "region"));
  fillSelect(caseEls.source, uniqueValues(caseState.items, "source_type"));
  fillSelect(caseEls.method, uniqueValues(caseState.items, "ai_tool_or_method"));

  [
    [caseEls.search, "input", "search"],
    [caseEls.subcategory, "change", "subcategory"],
    [caseEls.level, "change", "level"],
    [caseEls.language, "change", "language"],
    [caseEls.region, "change", "region"],
    [caseEls.source, "change", "source"],
    [caseEls.method, "change", "method"],
    [caseEls.sort, "change", "sort"],
  ].forEach(([element, eventName, key]) => {
    element.addEventListener(eventName, (event) => {
      caseState[key] = event.target.value;
      caseState.page = 1;
      renderCases();
    });
  });

  caseEls.reset.addEventListener("click", () => {
    Object.assign(caseState, {
      category: "全部",
      subcategory: "全部",
      search: "",
      level: "全部",
      language: "全部",
      region: "全部",
      source: "全部",
      method: "全部",
      sort: "date-desc",
      page: 1,
    });
    caseEls.search.value = "";
    fillSelect(caseEls.subcategory, caseSubcategories());
    [caseEls.subcategory, caseEls.level, caseEls.language, caseEls.region, caseEls.source, caseEls.method].forEach(
      (select) => {
        select.value = "全部";
      }
    );
    caseEls.sort.value = "date-desc";
    renderCases();
  });
}

function resourceSearchText(item) {
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

function filteredResources() {
  const query = resourceState.search.trim().toLowerCase();
  return resourceState.items
    .filter((item) => {
      return (
        (!query || resourceSearchText(item).includes(query)) &&
        matchesField(item.region, resourceState.region) &&
        matchesField(item.education_level, resourceState.level) &&
        matchesField(item.audience, resourceState.audience) &&
        matchesField(item.resource_type, resourceState.resourceType) &&
        matchesField(item.category, resourceState.category) &&
        matchesField(item.language, resourceState.language) &&
        matchesField(item.access_type, resourceState.accessType)
      );
    })
    .sort((a, b) => {
      if (resourceState.sort === "date-desc") return dateValue(b.published_date) - dateValue(a.published_date);
      if (resourceState.sort === "date-asc") return dateValue(a.published_date) - dateValue(b.published_date);
      if (resourceState.sort === "region-asc") return a.region.localeCompare(b.region, "zh-Hans-CN");
      if (resourceState.sort === "publisher-asc") return a.publisher.localeCompare(b.publisher, "zh-Hans-CN");
      return a.title_cn.localeCompare(b.title_cn, "zh-Hans-CN");
    });
}

function renderResourceCards(items) {
  resourceEls.cards.innerHTML = "";
  resourceEls.empty.hidden = items.length > 0;
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
    original.textContent =
      item.title_original && item.title_original !== item.title_cn ? item.title_original : item.subject;

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
    const useText = document.createElement("p");
    useText.textContent = item.use_case_cn;
    useHeader.append(useTitle);
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
    resourceEls.cards.append(card);
  });
}

function renderResourceStats() {
  const accessedDates = resourceState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  resourceEls.total.textContent = resourceState.items.length;
  viewElements.resourceTabCount.textContent = `${resourceState.items.length} 条资源`;
  resourceEls.regionCount.textContent = uniqueValues(resourceState.items, "region").length;
  resourceEls.resourceTypeCount.textContent = uniqueValues(resourceState.items, "resource_type").length;
  resourceEls.lastAccessed.textContent = accessedDates.at(-1) || "--";
}

function renderResources() {
  const items = filteredResources();
  const page = pageSlice(items, resourceState);
  renderResourceCards(page.items);
  renderPagination(items.length, resourceState, resourceEls, renderResources, resourceEls.cards);
  resourceEls.resultsTitle.textContent =
    resourceState.category === "全部" ? "全部资源" : `${resourceState.category} 资源`;
  resourceEls.resultsMeta.textContent =
    items.length === 0
      ? `显示 0 / ${resourceState.items.length} 条资源`
      : `显示 ${page.first}-${page.last} / ${items.length} 条资源（总库 ${resourceState.items.length} 条）`;
}

function setupResourceControls() {
  fillSelect(resourceEls.region, uniqueValues(resourceState.items, "region"));
  fillSelect(resourceEls.level, uniqueValues(resourceState.items, "education_level"));
  fillSelect(resourceEls.audience, uniqueValues(resourceState.items, "audience"));
  fillSelect(resourceEls.resourceType, uniqueValues(resourceState.items, "resource_type"));
  fillSelect(resourceEls.category, uniqueValues(resourceState.items, "category"));
  fillSelect(resourceEls.language, uniqueValues(resourceState.items, "language"));
  fillSelect(resourceEls.accessType, uniqueValues(resourceState.items, "access_type"));

  [
    [resourceEls.search, "input", "search"],
    [resourceEls.region, "change", "region"],
    [resourceEls.level, "change", "level"],
    [resourceEls.audience, "change", "audience"],
    [resourceEls.resourceType, "change", "resourceType"],
    [resourceEls.category, "change", "category"],
    [resourceEls.language, "change", "language"],
    [resourceEls.accessType, "change", "accessType"],
    [resourceEls.sort, "change", "sort"],
  ].forEach(([element, eventName, key]) => {
    element.addEventListener(eventName, (event) => {
      resourceState[key] = event.target.value;
      resourceState.page = 1;
      renderResources();
    });
  });

  resourceEls.reset.addEventListener("click", () => {
    Object.assign(resourceState, {
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
    });
    resourceEls.search.value = "";
    [
      resourceEls.region,
      resourceEls.level,
      resourceEls.audience,
      resourceEls.resourceType,
      resourceEls.category,
      resourceEls.language,
      resourceEls.accessType,
    ].forEach((select) => {
      select.value = "全部";
    });
    resourceEls.sort.value = "title-asc";
    renderResources();
  });
}

function promptSearchText(item) {
  return [
    item.title_cn,
    item.prompt_type,
    item.category,
    item.subject,
    item.education_level,
    item.audience,
    item.output_format,
    item.ai_tool_or_method,
    item.prompt_cn,
    item.use_case_cn,
    item.source_title,
  ]
    .join(" ")
    .toLowerCase();
}

function filteredPrompts() {
  const query = promptState.search.trim().toLowerCase();
  return promptState.items
    .filter((item) => {
      return (
        (!query || promptSearchText(item).includes(query)) &&
        matchesField(item.subject, promptState.subject) &&
        matchesField(item.education_level, promptState.level) &&
        matchesField(item.prompt_type, promptState.promptType) &&
        matchesField(item.category, promptState.category) &&
        matchesField(item.audience, promptState.audience) &&
        matchesField(item.output_format, promptState.outputFormat)
      );
    })
    .sort((a, b) => {
      if (promptState.sort === "type-asc") return a.prompt_type.localeCompare(b.prompt_type, "zh-Hans-CN");
      if (promptState.sort === "title-asc") return a.title_cn.localeCompare(b.title_cn, "zh-Hans-CN");
      return a.subject.localeCompare(b.subject, "zh-Hans-CN");
    });
}

function renderPromptCards(items) {
  promptEls.cards.innerHTML = "";
  promptEls.empty.hidden = items.length > 0;
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "case-card prompt-card";

    const topline = document.createElement("div");
    topline.className = "case-topline";
    topline.append(createTag(item.prompt_type, "category"), createTag(item.subject), createTag(item.category, "source"));

    const title = document.createElement("h3");
    title.textContent = item.title_cn;

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = item.use_case_cn;

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta("学段", item.education_level),
      createMeta("受众", item.audience),
      createMeta("输出格式", item.output_format),
      createMeta("AI工具", item.ai_tool_or_method)
    );

    const promptBlock = document.createElement("div");
    promptBlock.className = "workflow-block prompt-block";
    const promptHeader = document.createElement("div");
    promptHeader.className = "workflow-header";
    const promptTitle = document.createElement("h4");
    promptTitle.textContent = "可复制 Prompt";
    promptHeader.append(promptTitle, createCopyButton(item.prompt_cn, "复制 Prompt"));
    const promptText = document.createElement("pre");
    promptText.textContent = item.prompt_cn;
    promptBlock.append(promptHeader, promptText);

    const footer = document.createElement("div");
    footer.className = "card-footer";
    const source = document.createElement("span");
    source.className = "date";
    source.textContent = `参考：${item.source_title} · 访问：${item.accessed_date}`;
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = item.source_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "来源";

    footer.append(source, link);
    card.append(topline, title, summary, meta, promptBlock, footer);
    promptEls.cards.append(card);
  });
}

function renderPromptStats() {
  const accessedDates = promptState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  promptEls.total.textContent = promptState.items.length;
  viewElements.promptTabCount.textContent = `${promptState.items.length} 个 Prompt`;
  promptEls.subjectCount.textContent = uniqueValues(promptState.items, "subject").length;
  promptEls.promptTypeCount.textContent = uniqueValues(promptState.items, "prompt_type").length;
  promptEls.lastAccessed.textContent = accessedDates.at(-1) || "--";
}

function renderPrompts() {
  const items = filteredPrompts();
  const page = pageSlice(items, promptState);
  renderPromptCards(page.items);
  renderPagination(items.length, promptState, promptEls, renderPrompts, promptEls.cards);
  promptEls.resultsTitle.textContent =
    promptState.subject === "全部" ? "全部 Prompt" : `${promptState.subject} Prompt`;
  promptEls.resultsMeta.textContent =
    items.length === 0
      ? `显示 0 / ${promptState.items.length} 条 Prompt`
      : `显示 ${page.first}-${page.last} / ${items.length} 条 Prompt（总库 ${promptState.items.length} 条）`;
}

function setupPromptControls() {
  fillSelect(promptEls.subject, uniqueValues(promptState.items, "subject"));
  fillSelect(promptEls.level, uniqueValues(promptState.items, "education_level"));
  fillSelect(promptEls.promptType, uniqueValues(promptState.items, "prompt_type"));
  fillSelect(promptEls.category, uniqueValues(promptState.items, "category"));
  fillSelect(promptEls.audience, uniqueValues(promptState.items, "audience"));
  fillSelect(promptEls.outputFormat, uniqueValues(promptState.items, "output_format"));

  [
    [promptEls.search, "input", "search"],
    [promptEls.subject, "change", "subject"],
    [promptEls.level, "change", "level"],
    [promptEls.promptType, "change", "promptType"],
    [promptEls.category, "change", "category"],
    [promptEls.audience, "change", "audience"],
    [promptEls.outputFormat, "change", "outputFormat"],
    [promptEls.sort, "change", "sort"],
  ].forEach(([element, eventName, key]) => {
    element.addEventListener(eventName, (event) => {
      promptState[key] = event.target.value;
      promptState.page = 1;
      renderPrompts();
    });
  });

  promptEls.reset.addEventListener("click", () => {
    Object.assign(promptState, {
      search: "",
      subject: "全部",
      level: "全部",
      promptType: "全部",
      category: "全部",
      audience: "全部",
      outputFormat: "全部",
      sort: "subject-asc",
      page: 1,
    });
    promptEls.search.value = "";
    [promptEls.subject, promptEls.level, promptEls.promptType, promptEls.category, promptEls.audience, promptEls.outputFormat].forEach(
      (select) => {
        select.value = "全部";
      }
    );
    promptEls.sort.value = "subject-asc";
    renderPrompts();
  });
}

async function loadData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return parseCsv(await response.text());
}

function showLoadError(elements, url, error) {
  elements.resultsTitle.textContent = "数据读取失败";
  elements.resultsMeta.textContent = `请确认 ${url} 可以访问。`;
  elements.empty.hidden = false;
  elements.empty.querySelector("h2").textContent = "无法读取 CSV";
  elements.empty.querySelector("p").textContent = error.message;
}

async function initCases() {
  try {
    caseState.items = await loadData(DATA_URLS.cases);
    setupCaseControls();
    renderCaseStats();
    renderCases();
  } catch (error) {
    showLoadError(caseEls, DATA_URLS.cases, error);
  }
}

async function initResources() {
  try {
    resourceState.items = await loadData(DATA_URLS.resources);
    setupResourceControls();
    renderResourceStats();
    renderResources();
  } catch (error) {
    showLoadError(resourceEls, DATA_URLS.resources, error);
  }
}

async function initPrompts() {
  try {
    promptState.items = await loadData(DATA_URLS.prompts);
    setupPromptControls();
    renderPromptStats();
    renderPrompts();
  } catch (error) {
    showLoadError(promptEls, DATA_URLS.prompts, error);
  }
}

setupViewTabs();
initCases();
initResources();
initPrompts();
initAssistant();
