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

const SUPPORTED_LANGUAGES = ["zh-Hans", "zh-Hant", "en"];
const LANGUAGE_LABELS = {
  "zh-Hans": "简体中文",
  "zh-Hant": "繁體中文",
  en: "English",
};
const LANGUAGE_META = {
  "zh-Hans": { htmlLang: "zh-CN", locale: "zh-Hans-CN" },
  "zh-Hant": { htmlLang: "zh-HK", locale: "zh-Hant-HK" },
  en: { htmlLang: "en", locale: "en" },
};

const TEXT = {
  "zh-Hans": {
    documentTitle: "AIED Case Hub | AI教育资料库",
    documentDescription:
      "AIED Case Hub 收集 AI 教育教学案例、全球教材资源和教师可复制 Prompt 模板，支持按学科、学段、语言、地区和类型筛选。",
    skipLink: "跳到内容列表",
    eyebrow: "AI Education Library",
    subtitle: "AI 教育教学案例、教材资源与 Prompt 模板库",
    mainTabsAria: "内容选项卡",
    dataActionsAria: "数据操作",
    languageLabel: "语言",
    languageSelectAria: "选择界面语言",
    casesCsv: "案例 CSV",
    resourcesCsv: "资源 CSV",
    promptsCsv: "Prompt CSV",
    tabCases: "教学案例",
    tabResources: "教材资源",
    tabPrompts: "Prompt 模板",
    tabAssistant: "AI 助手",
    assistantStatusTrial: "有限额试用",
    assistantStatusPending: "待连接",
    assistantStatusConnected: "已连接",
    caseDashboardAria: "案例库概览",
    casesCollected: "已收录案例",
    hkPriorityCases: "香港优先案例",
    topCategories: "一级栏目",
    latestAccessed: "最近访问日期",
    caseToolbarAria: "案例检索和筛选",
    caseCategoryAria: "案例栏目",
    keyword: "关键词",
    caseSearchPlaceholder: "搜索标题、摘要、工作流、地区、工具或来源",
    subcategory: "细分方向",
    educationLevel: "学段",
    language: "语言",
    region: "地区",
    source: "来源",
    aiType: "AI类型",
    sort: "排序",
    reset: "重置",
    loadingCases: "正在读取案例数据...",
    caseListAria: "案例列表",
    noCasesTitle: "没有找到匹配案例",
    noCasesCopy: "试试减少筛选条件，或换一个关键词。",
    casePaginationAria: "案例分页",
    resourceDashboardAria: "资源库概览",
    resourcesCollected: "已收录资源",
    regionsOrOrgs: "地区/组织来源",
    resourceTypes: "资源类型",
    resourceToolbarAria: "资源检索和筛选",
    resourceSearchPlaceholder: "搜索标题、简介、适用方式、发布机构或地区",
    audience: "受众",
    resourceType: "资源类型",
    category: "类别",
    accessType: "访问方式",
    loadingResources: "正在读取资源数据...",
    resourceListAria: "资源列表",
    noResourcesTitle: "没有找到匹配资源",
    noResourcesCopy: "试试减少筛选条件，或换一个关键词。",
    resourcePaginationAria: "资源分页",
    promptDashboardAria: "Prompt 模板库概览",
    promptTemplates: "Prompt 模板",
    subjectsOrTopics: "学科/主题",
    promptTypes: "Prompt 类型",
    promptToolbarAria: "Prompt 检索和筛选",
    promptSearchPlaceholder: "搜索学科、用途、Prompt 内容或来源",
    subject: "学科",
    promptType: "Prompt 类型",
    outputFormat: "输出格式",
    loadingPrompts: "正在读取 Prompt 数据...",
    promptListAria: "Prompt 模板列表",
    noPromptsTitle: "没有找到匹配 Prompt",
    noPromptsCopy: "试试减少筛选条件，或换一个关键词。",
    promptPaginationAria: "Prompt 分页",
    assistantAria: "AI 助手",
    assistantEyebrow: "RAG Research Assistant",
    openModelScope: "打开魔搭应用",
    assistantEmptyTitle: "AI 助手待连接",
    assistantEmptyCopy: "魔搭 Studio 应用地址配置后，这里会显示有限额 RAG 问答窗口。",
    assistantLoadErrorTitle: "AI 助手配置读取失败",
    assistantLoadErrorCopy: "请确认 {url} 可以访问。",
    footerNote:
      "数据维护：编辑 data/cases.csv、data/resources.csv 或 data/prompts.csv 后提交到 GitHub Pages 即可更新。",
    all: "全部",
    notMarked: "未标注",
    previousPage: "上一页",
    nextPage: "下一页",
    pageStatus: "第 {page} / {totalPages} 页",
    copied: "已复制",
    copyFailed: "复制失败",
    workflowTitle: "可复制工作流",
    copyWorkflow: "复制工作流",
    useCase: "适用方式",
    promptCopyTitle: "可复制 Prompt",
    copyPrompt: "复制 Prompt",
    published: "发布",
    accessed: "访问",
    viewSource: "查看来源",
    openResource: "打开资源",
    sourceLink: "来源",
    reference: "参考",
    publisher: "发布机构",
    subjectTopic: "学科/主题",
    outputFormatMeta: "输出格式",
    aiTool: "AI工具",
    sortDateDesc: "发布日期：新到旧",
    sortDateAsc: "发布日期：旧到新",
    sortTitleAsc: "标题：A-Z",
    sortRegionAsc: "地区：A-Z",
    sortPublisherAsc: "发布机构：A-Z",
    sortSubjectAsc: "学科：A-Z",
    sortTypeAsc: "类型：A-Z",
    allCases: "全部案例",
    allResources: "全部资源",
    allPrompts: "全部 Prompt",
    resourceTitle: "{category} 资源",
    promptTitle: "{subject} Prompt",
    caseCount: "{count} 条案例",
    resourceCount: "{count} 条资源",
    promptCount: "{count} 个 Prompt",
    caseResultsEmpty: "显示 0 / {total} 条案例",
    caseResultsRange: "显示 {first}-{last} / {shown} 条案例（总库 {total} 条）",
    resourceResultsEmpty: "显示 0 / {total} 条资源",
    resourceResultsRange: "显示 {first}-{last} / {shown} 条资源（总库 {total} 条）",
    promptResultsEmpty: "显示 0 / {total} 条 Prompt",
    promptResultsRange: "显示 {first}-{last} / {shown} 条 Prompt（总库 {total} 条）",
    loadErrorTitle: "数据读取失败",
    loadErrorMeta: "请确认 {url} 可以访问。",
    csvErrorTitle: "无法读取 CSV",
    fallbackCaseLabel: "案例",
    fallbackCaseGoal: "目标：围绕{topic}设计一节AI辅助学习活动。",
    fallbackCaseFlow:
      "流程：1. 给学生一个真实问题；2. 用{tool}生成、比较或反馈；3. 让学生记录判断依据；4. 分享作品并反思AI的帮助和局限。",
    fallbackCaseOutput: "产出：一份学习作品、一段反思或一张评价表。",
  },
  en: {
    documentTitle: "AIED Case Hub | AI Education Library",
    documentDescription:
      "AIED Case Hub collects AI teaching cases, global curriculum resources and teacher-ready prompt templates with filters by subject, level, language, region and type.",
    skipLink: "Skip to content list",
    eyebrow: "AI Education Library",
    subtitle: "AI teaching cases, curriculum resources, prompt templates and a RAG assistant",
    mainTabsAria: "Content tabs",
    dataActionsAria: "Data actions",
    languageLabel: "Language",
    languageSelectAria: "Select interface language",
    casesCsv: "Cases CSV",
    resourcesCsv: "Resources CSV",
    promptsCsv: "Prompt CSV",
    tabCases: "Teaching Cases",
    tabResources: "Resources",
    tabPrompts: "Prompt Templates",
    tabAssistant: "AI Assistant",
    assistantStatusTrial: "Trial quota",
    assistantStatusPending: "Not connected",
    assistantStatusConnected: "Connected",
    caseDashboardAria: "Case library overview",
    casesCollected: "Collected cases",
    hkPriorityCases: "Hong Kong-priority cases",
    topCategories: "Top categories",
    latestAccessed: "Latest access date",
    caseToolbarAria: "Case search and filters",
    caseCategoryAria: "Case categories",
    keyword: "Keyword",
    caseSearchPlaceholder: "Search titles, summaries, workflows, regions, tools or sources",
    subcategory: "Subcategory",
    educationLevel: "Level",
    language: "Language",
    region: "Region",
    source: "Source",
    aiType: "AI type",
    sort: "Sort",
    reset: "Reset",
    loadingCases: "Loading case data...",
    caseListAria: "Case list",
    noCasesTitle: "No matching cases",
    noCasesCopy: "Try fewer filters or a different keyword.",
    casePaginationAria: "Case pagination",
    resourceDashboardAria: "Resource library overview",
    resourcesCollected: "Collected resources",
    regionsOrOrgs: "Regions / organizations",
    resourceTypes: "Resource types",
    resourceToolbarAria: "Resource search and filters",
    resourceSearchPlaceholder: "Search titles, summaries, use cases, publishers or regions",
    audience: "Audience",
    resourceType: "Resource type",
    category: "Category",
    accessType: "Access",
    loadingResources: "Loading resource data...",
    resourceListAria: "Resource list",
    noResourcesTitle: "No matching resources",
    noResourcesCopy: "Try fewer filters or a different keyword.",
    resourcePaginationAria: "Resource pagination",
    promptDashboardAria: "Prompt template overview",
    promptTemplates: "Prompt templates",
    subjectsOrTopics: "Subjects / topics",
    promptTypes: "Prompt types",
    promptToolbarAria: "Prompt search and filters",
    promptSearchPlaceholder: "Search subjects, uses, prompt text or sources",
    subject: "Subject",
    promptType: "Prompt type",
    outputFormat: "Output format",
    loadingPrompts: "Loading prompt data...",
    promptListAria: "Prompt template list",
    noPromptsTitle: "No matching prompts",
    noPromptsCopy: "Try fewer filters or a different keyword.",
    promptPaginationAria: "Prompt pagination",
    assistantAria: "AI assistant",
    assistantEyebrow: "RAG Research Assistant",
    openModelScope: "Open ModelScope app",
    assistantEmptyTitle: "AI Assistant not connected",
    assistantEmptyCopy: "After a ModelScope Studio app URL is configured, the limited-quota RAG chat window will appear here.",
    assistantLoadErrorTitle: "AI Assistant config failed to load",
    assistantLoadErrorCopy: "Please confirm {url} is accessible.",
    footerNote:
      "Data maintenance: edit data/cases.csv, data/resources.csv or data/prompts.csv and commit to GitHub Pages to update the site.",
    all: "All",
    notMarked: "Not marked",
    previousPage: "Previous",
    nextPage: "Next",
    pageStatus: "Page {page} of {totalPages}",
    copied: "Copied",
    copyFailed: "Copy failed",
    workflowTitle: "Copy-ready workflow",
    copyWorkflow: "Copy workflow",
    useCase: "How to use",
    promptCopyTitle: "Copy-ready prompt",
    copyPrompt: "Copy prompt",
    published: "Published",
    accessed: "Accessed",
    viewSource: "View source",
    openResource: "Open resource",
    sourceLink: "Source",
    reference: "Reference",
    publisher: "Publisher",
    subjectTopic: "Subject / topic",
    outputFormatMeta: "Output format",
    aiTool: "AI tool",
    sortDateDesc: "Published: newest first",
    sortDateAsc: "Published: oldest first",
    sortTitleAsc: "Title: A-Z",
    sortRegionAsc: "Region: A-Z",
    sortPublisherAsc: "Publisher: A-Z",
    sortSubjectAsc: "Subject: A-Z",
    sortTypeAsc: "Type: A-Z",
    allCases: "All cases",
    allResources: "All resources",
    allPrompts: "All prompts",
    resourceTitle: "{category} resources",
    promptTitle: "{subject} prompts",
    caseCount: "{count} cases",
    resourceCount: "{count} resources",
    promptCount: "{count} prompts",
    caseResultsEmpty: "Showing 0 of {total} cases",
    caseResultsRange: "Showing {first}-{last} of {shown} cases ({total} total)",
    resourceResultsEmpty: "Showing 0 of {total} resources",
    resourceResultsRange: "Showing {first}-{last} of {shown} resources ({total} total)",
    promptResultsEmpty: "Showing 0 of {total} prompts",
    promptResultsRange: "Showing {first}-{last} of {shown} prompts ({total} total)",
    loadErrorTitle: "Data failed to load",
    loadErrorMeta: "Please confirm {url} is accessible.",
    csvErrorTitle: "Could not read CSV",
    fallbackCaseLabel: "Case",
    fallbackCaseGoal: "Goal: design an AI-supported learning activity around {topic}.",
    fallbackCaseFlow:
      "Workflow: 1. Give students an authentic question; 2. Use {tool} to generate, compare or give feedback; 3. Ask students to record their reasoning; 4. Share work and reflect on AI's support and limits.",
    fallbackCaseOutput: "Output: a learning artifact, a reflection or an assessment checklist.",
  },
};

const VALUE_EN = {
  全部: "All",
  香港: "Hong Kong",
  中国内地: "Mainland China",
  大中华地区: "Greater China",
  台湾: "Taiwan",
  新加坡: "Singapore",
  美国: "United States",
  英国: "United Kingdom",
  欧盟: "European Union",
  澳大利亚: "Australia",
  全球: "Global",
  全球组织: "Global organization",
  中文简体: "Simplified Chinese",
  中文繁体: "Traditional Chinese",
  英文: "English",
  小学: "Primary",
  中学: "Secondary",
  高等教育: "Higher education",
  教师教育: "Teacher education",
  中小学: "K-12",
  "中小学/高等教育": "K-12 / higher education",
  "小学/中学": "Primary / secondary",
  "小学/中学/高等教育": "Primary / secondary / higher education",
  混合: "Mixed",
  教师: "Teachers",
  学生: "Students",
  "教师/学校领导/教师培训者": "Teachers / school leaders / teacher trainers",
  "政策制定者/课程设计者/研究者": "Policymakers / curriculum designers / researchers",
  "学生/教师/课程设计者": "Students / teachers / curriculum designers",
  "教育管理者/教师/研究者": "Education leaders / teachers / researchers",
  "教师/课程主任": "Teachers / curriculum leaders",
  官方: "Official",
  "官方/学校": "Official / school",
  "论文/研究": "Paper / research",
  教师实践: "Teacher practice",
  媒体报道: "Media report",
  "课程/教材": "Course / curriculum",
  教师指南: "Teacher guide",
  政策框架: "Policy framework",
  课堂工具包: "Classroom toolkit",
  学生课程: "Student course",
  资源目录: "Resource directory",
  研究报告: "Research report",
  免费: "Free",
  需注册: "Registration required",
  "付费/订阅": "Paid / subscription",
  未知: "Unknown",
  备课设计: "Lesson planning",
  教材生成: "Material generation",
  练习与作业: "Practice and homework",
  评价反馈: "Assessment feedback",
  差异化支持: "Differentiated support",
  项目学习: "Project-based learning",
  课堂活动: "Classroom activity",
  家校沟通: "Family-school communication",
  学生支持: "Student support",
  通用备课: "General lesson planning",
  通用单元设计: "General unit design",
  通用课堂活动: "General classroom activity",
  通用分层教学: "General differentiated instruction",
};

const TRADITIONAL_PHRASES = [
  ["人工智能", "人工智能"],
  ["生成式人工智能", "生成式人工智能"],
  ["AI 教育教学案例", "AI 教育教學案例"],
  ["教材资源", "教材資源"],
  ["资料库", "資料庫"],
  ["教学案例", "教學案例"],
  ["教师", "教師"],
  ["学生", "學生"],
  ["课程", "課程"],
  ["课堂", "課堂"],
  ["学习", "學習"],
  ["数据库", "資料庫"],
  ["访问", "訪問"],
  ["资源", "資源"],
  ["案例", "案例"],
  ["简体中文", "簡體中文"],
  ["繁体中文", "繁體中文"],
];

const TRADITIONAL_CHARS = {
  万: "萬",
  与: "與",
  专: "專",
  业: "業",
  东: "東",
  丝: "絲",
  严: "嚴",
  个: "個",
  临: "臨",
  为: "為",
  举: "舉",
  义: "義",
  乌: "烏",
  乐: "樂",
  习: "習",
  书: "書",
  买: "買",
  乱: "亂",
  争: "爭",
  于: "於",
  云: "雲",
  亚: "亞",
  产: "產",
  亲: "親",
  仅: "僅",
  从: "從",
  仑: "侖",
  仓: "倉",
  仪: "儀",
  们: "們",
  优: "優",
  会: "會",
  传: "傳",
  伤: "傷",
  伦: "倫",
  伪: "偽",
  体: "體",
  余: "餘",
  佛: "佛",
  作: "作",
  你: "你",
  侠: "俠",
  侣: "侶",
  侦: "偵",
  侧: "側",
  侨: "僑",
  侩: "儈",
  侪: "儕",
  侬: "儂",
  俭: "儉",
  债: "債",
  倾: "傾",
  偿: "償",
  储: "儲",
  儿: "兒",
  兑: "兌",
  党: "黨",
  兰: "蘭",
  关: "關",
  兴: "興",
  养: "養",
  内: "內",
  册: "冊",
  写: "寫",
  军: "軍",
  农: "農",
  冲: "衝",
  决: "決",
  况: "況",
  净: "淨",
  准: "準",
  几: "幾",
  击: "擊",
  则: "則",
  刚: "剛",
  创: "創",
  删: "刪",
  别: "別",
  刬: "剗",
  刹: "剎",
  制: "制",
  剂: "劑",
  剑: "劍",
  剧: "劇",
  务: "務",
  动: "動",
  励: "勵",
  劲: "勁",
  劳: "勞",
  势: "勢",
  勋: "勳",
  区: "區",
  医: "醫",
  华: "華",
  协: "協",
  单: "單",
  卖: "賣",
  卢: "盧",
  卫: "衛",
  历: "歷",
  压: "壓",
  县: "縣",
  参: "參",
  双: "雙",
  发: "發",
  变: "變",
  叙: "敘",
  叶: "葉",
  号: "號",
  后: "後",
  向: "向",
  吗: "嗎",
  启: "啟",
  员: "員",
  咨: "諮",
  咸: "鹹",
  响: "響",
  哑: "啞",
  哟: "喲",
  唤: "喚",
  售: "售",
  啦: "啦",
  喷: "噴",
  嘱: "囑",
  团: "團",
  园: "園",
  困: "困",
  国: "國",
  图: "圖",
  圆: "圓",
  圣: "聖",
  场: "場",
  块: "塊",
  坚: "堅",
  坛: "壇",
  坝: "壩",
  坞: "塢",
  垄: "壟",
  垅: "壠",
  型: "型",
  垒: "壘",
  垦: "墾",
  垩: "堊",
  垫: "墊",
  垭: "埡",
  垱: "壋",
  垲: "塏",
  埙: "塤",
  埚: "堝",
  堑: "塹",
  墙: "牆",
  壮: "壯",
  声: "聲",
  壳: "殼",
  壶: "壺",
  处: "處",
  备: "備",
  复: "復",
  够: "夠",
  头: "頭",
  夹: "夾",
  夺: "奪",
  奖: "獎",
  奥: "奧",
  妆: "妝",
  妇: "婦",
  妈: "媽",
  姜: "薑",
  娄: "婁",
  娅: "婭",
  娆: "嬈",
  娇: "嬌",
  娈: "孌",
  娱: "娛",
  婴: "嬰",
  孙: "孫",
  学: "學",
  宁: "寧",
  宝: "寶",
  实: "實",
  审: "審",
  宪: "憲",
  宫: "宮",
  宽: "寬",
  宾: "賓",
  对: "對",
  寻: "尋",
  导: "導",
  寿: "壽",
  将: "將",
  尔: "爾",
  尘: "塵",
  尝: "嘗",
  尧: "堯",
  尴: "尷",
  尽: "盡",
  层: "層",
  屉: "屜",
  属: "屬",
  岁: "歲",
  岂: "豈",
  岛: "島",
  岭: "嶺",
  岳: "嶽",
  峡: "峽",
  峦: "巒",
  巅: "巔",
  巩: "鞏",
  币: "幣",
  帅: "帥",
  师: "師",
  帐: "帳",
  带: "帶",
  帧: "幀",
  帮: "幫",
  干: "幹",
  并: "並",
  广: "廣",
  庄: "莊",
  庆: "慶",
  庐: "廬",
  库: "庫",
  应: "應",
  庙: "廟",
  庞: "龐",
  废: "廢",
  开: "開",
  异: "異",
  弃: "棄",
  张: "張",
  弥: "彌",
  弯: "彎",
  当: "當",
  录: "錄",
  彦: "彥",
  彩: "彩",
  彻: "徹",
  征: "徵",
  径: "徑",
  忆: "憶",
  忏: "懺",
  忧: "憂",
  忾: "愾",
  怀: "懷",
  态: "態",
  怂: "慫",
  怜: "憐",
  总: "總",
  恶: "惡",
  恳: "懇",
  恸: "慟",
  恹: "懨",
  恺: "愷",
  恻: "惻",
  恼: "惱",
  悦: "悅",
  悮: "悞",
  惊: "驚",
  惧: "懼",
  惨: "慘",
  惩: "懲",
  惫: "憊",
  惬: "愜",
  惭: "慚",
  惮: "憚",
  惯: "慣",
  愤: "憤",
  愦: "憒",
  愿: "願",
  慑: "懾",
  懑: "懣",
  戏: "戲",
  战: "戰",
  户: "戶",
  扑: "撲",
  执: "執",
  扩: "擴",
  扪: "捫",
  扫: "掃",
  扬: "揚",
  扰: "擾",
  抚: "撫",
  抛: "拋",
  抟: "摶",
  抠: "摳",
  抡: "掄",
  抢: "搶",
  护: "護",
  报: "報",
  担: "擔",
  拟: "擬",
  拢: "攏",
  拣: "揀",
  拥: "擁",
  拦: "攔",
  拧: "擰",
  拨: "撥",
  择: "擇",
  挂: "掛",
  挚: "摯",
  挛: "攣",
  挜: "掗",
  挝: "撾",
  挞: "撻",
  挟: "挾",
  挠: "撓",
  挡: "擋",
  挢: "撟",
  挣: "掙",
  挤: "擠",
  挥: "揮",
  捞: "撈",
  损: "損",
  捡: "撿",
  换: "換",
  捣: "搗",
  据: "據",
  掳: "擄",
  掴: "摑",
  掷: "擲",
  掸: "撣",
  掺: "摻",
  掼: "摜",
  揽: "攬",
  搀: "攙",
  搁: "擱",
  搂: "摟",
  搅: "攪",
  携: "攜",
  摄: "攝",
  摆: "擺",
  摇: "搖",
  摈: "擯",
  摊: "攤",
  撄: "攖",
  撑: "撐",
  撵: "攆",
  撷: "擷",
 撸: "擼",
  撺: "攛",
  擞: "擻",
  攒: "攢",
  敌: "敵",
  敛: "斂",
  数: "數",
  斋: "齋",
  斓: "斕",
  斗: "鬥",
  斩: "斬",
  断: "斷",
  无: "無",
  旧: "舊",
  时: "時",
  昙: "曇",
  昼: "晝",
  显: "顯",
  晋: "晉",
  晒: "曬",
  晓: "曉",
  晕: "暈",
  暂: "暫",
  术: "術",
  机: "機",
  杀: "殺",
  杂: "雜",
  权: "權",
  条: "條",
  来: "來",
  杨: "楊",
  杩: "榪",
  杰: "傑",
  极: "極",
  构: "構",
  枢: "樞",
  枣: "棗",
  枪: "槍",
  枫: "楓",
  枭: "梟",
  柜: "櫃",
  标: "標",
  栈: "棧",
  栉: "櫛",
  栋: "棟",
  栌: "櫨",
  栎: "櫟",
  栏: "欄",
  树: "樹",
  栖: "棲",
  样: "樣",
  栾: "欒",
  桠: "椏",
  桡: "橈",
  桢: "楨",
  档: "檔",
  桤: "榿",
  桥: "橋",
  桦: "樺",
  桧: "檜",
  桨: "槳",
  桩: "樁",
  梦: "夢",
  梼: "檮",
  梾: "棶",
  梿: "槤",
  检: "檢",
  棂: "欞",
  椁: "槨",
  椟: "櫝",
  椠: "槧",
  椤: "欏",
  椭: "橢",
  楼: "樓",
  榄: "欖",
  榅: "榲",
  榇: "櫬",
  榈: "櫚",
  榉: "櫸",
  槚: "檟",
  槛: "檻",
  槟: "檳",
  槠: "櫧",
  横: "橫",
  樯: "檣",
  樱: "櫻",
  橥: "櫫",
  橱: "櫥",
  橹: "櫓",
  橼: "櫞",
  檩: "檁",
  欢: "歡",
  欤: "歟",
  欧: "歐",
  欲: "慾",
  歼: "殲",
  殁: "歿",
  残: "殘",
  殒: "殞",
  殓: "殮",
  殚: "殫",
  殡: "殯",
  殴: "毆",
  毁: "毀",
  毕: "畢",
  毙: "斃",
  毡: "氈",
  气: "氣",
  氢: "氫",
  氧: "氧",
  氨: "氨",
  氩: "氬",
  氲: "氳",
  汉: "漢",
  汤: "湯",
  汹: "洶",
  沟: "溝",
  没: "沒",
  沣: "灃",
  沤: "漚",
  沥: "瀝",
  沦: "淪",
  沧: "滄",
  沨: "渢",
  沪: "滬",
  泞: "濘",
  泪: "淚",
  泶: "澩",
  泷: "瀧",
  泸: "瀘",
  泺: "濼",
  泻: "瀉",
  泼: "潑",
  泽: "澤",
  洁: "潔",
  洒: "灑",
  洼: "窪",
  浅: "淺",
  浆: "漿",
  浇: "澆",
  浈: "湞",
  浊: "濁",
  测: "測",
  济: "濟",
  浏: "瀏",
  浑: "渾",
  浒: "滸",
  浓: "濃",
  浔: "潯",
  涛: "濤",
  涝: "澇",
  涞: "淶",
  涟: "漣",
  涠: "潿",
  涡: "渦",
  涢: "溳",
  涣: "渙",
  涤: "滌",
  润: "潤",
  涧: "澗",
  涨: "漲",
  涩: "澀",
  淀: "澱",
  渊: "淵",
  渍: "漬",
  渎: "瀆",
  渐: "漸",
  渑: "澠",
  渔: "漁",
  渖: "瀋",
  渗: "滲",
  温: "溫",
  湾: "灣",
  湿: "濕",
  溃: "潰",
  溅: "濺",
  滚: "滾",
  滞: "滯",
  滟: "灧",
  滠: "灄",
  满: "滿",
  滢: "瀅",
  滤: "濾",
  滥: "濫",
  滦: "灤",
  滨: "濱",
  滩: "灘",
  滪: "澦",
  漓: "灕",
  漤: "灠",
  潆: "瀠",
  潇: "瀟",
  潋: "瀲",
  潍: "濰",
  潜: "潛",
  潴: "瀦",
  澜: "瀾",
  濑: "瀨",
  濒: "瀕",
  灏: "灝",
  灭: "滅",
  灯: "燈",
  灵: "靈",
  灾: "災",
  灿: "燦",
  炀: "煬",
  炉: "爐",
  炖: "燉",
  炜: "煒",
  炝: "熗",
  点: "點",
  炼: "煉",
  炽: "熾",
  烁: "爍",
  烂: "爛",
  烃: "烴",
  烛: "燭",
  烟: "煙",
  烦: "煩",
  烧: "燒",
  烨: "燁",
  烩: "燴",
  烫: "燙",
  烬: "燼",
  热: "熱",
  焕: "煥",
  焖: "燜",
  煴: "熅",
  爱: "愛",
  爷: "爺",
  牍: "牘",
  牵: "牽",
  牺: "犧",
  犊: "犢",
  状: "狀",
  犷: "獷",
  犸: "獁",
  犹: "猶",
  狈: "狽",
  狞: "獰",
  独: "獨",
  狭: "狹",
  狮: "獅",
  狯: "獪",
  狰: "猙",
  狱: "獄",
  狲: "猻",
  猎: "獵",
  猕: "獼",
  猡: "玀",
  猫: "貓",
  献: "獻",
  獭: "獺",
  玑: "璣",
  玚: "瑒",
  玛: "瑪",
  玮: "瑋",
  环: "環",
  现: "現",
  玱: "瑲",
  玺: "璽",
  珐: "琺",
  珑: "瓏",
  珲: "琿",
  琏: "璉",
  琐: "瑣",
  琼: "瓊",
  瑶: "瑤",
  瑷: "璦",
  璎: "瓔",
  瓒: "瓚",
  瓮: "甕",
  电: "電",
  画: "畫",
  畅: "暢",
  畴: "疇",
  疖: "癤",
  疗: "療",
  疟: "瘧",
  疠: "癘",
  疡: "瘍",
  疬: "癧",
  疮: "瘡",
  疯: "瘋",
  疱: "皰",
  疴: "痾",
  痈: "癰",
  痉: "痙",
  痒: "癢",
  痨: "癆",
  痪: "瘓",
  痫: "癇",
  瘅: "癉",
  瘗: "瘞",
  瘘: "瘺",
  瘪: "癟",
  瘫: "癱",
  瘾: "癮",
  瘿: "癭",
  癞: "癩",
  癣: "癬",
  皑: "皚",
  皱: "皺",
  皲: "皸",
  盏: "盞",
  盐: "鹽",
  监: "監",
  盖: "蓋",
  盗: "盜",
  盘: "盤",
  眍: "瞘",
  眦: "眥",
  睁: "睜",
  睐: "睞",
  睑: "瞼",
  瞒: "瞞",
  瞩: "矚",
  矫: "矯",
  矶: "磯",
  矾: "礬",
  矿: "礦",
  砀: "碭",
  码: "碼",
  砖: "磚",
  砗: "硨",
  砚: "硯",
  砜: "碸",
  砺: "礪",
  砻: "礱",
  砾: "礫",
  础: "礎",
  硁: "硜",
  硕: "碩",
  硖: "硤",
  硗: "磽",
  硙: "磑",
  硚: "礄",
  确: "確",
  碍: "礙",
  碛: "磧",
  碜: "磣",
  礼: "禮",
  祎: "禕",
  祢: "禰",
  祯: "禎",
  祷: "禱",
  祸: "禍",
  禀: "稟",
  禄: "祿",
  禅: "禪",
  离: "離",
  秃: "禿",
  秆: "稈",
  种: "種",
  积: "積",
  称: "稱",
  秽: "穢",
  税: "稅",
  稣: "穌",
  稳: "穩",
  穑: "穡",
  穷: "窮",
  窃: "竊",
  窍: "竅",
  窑: "窯",
  窜: "竄",
  窝: "窩",
  窥: "窺",
  窦: "竇",
  窭: "窶",
  竖: "豎",
  竞: "競",
  笃: "篤",
  笋: "筍",
  笔: "筆",
  笕: "筧",
  笺: "箋",
  笼: "籠",
  笾: "籩",
  筚: "篳",
  筛: "篩",
  筜: "簹",
  筝: "箏",
  筹: "籌",
  筼: "篔",
  签: "簽",
  简: "簡",
  箓: "籙",
  箦: "簀",
  箧: "篋",
  箨: "籜",
  箩: "籮",
  箪: "簞",
  箫: "簫",
  篑: "簣",
  篓: "簍",
  篮: "籃",
  篱: "籬",
  簖: "籪",
  籁: "籟",
  籴: "糴",
  类: "類",
  籼: "秈",
  粜: "糶",
  粝: "糲",
  粤: "粵",
  粪: "糞",
  粮: "糧",
  糁: "糝",
  糇: "餱",
  糖: "糖",
  糗: "糗",
  糙: "糙",
  糨: "糨",
  系: "系",
  紧: "緊",
  累: "累",
  絷: "縶",
  纠: "糾",
  红: "紅",
  纣: "紂",
  纤: "纖",
  纥: "紇",
  约: "約",
  级: "級",
  纨: "紈",
  纩: "纊",
  纪: "紀",
  纫: "紉",
  纬: "緯",
  纭: "紜",
  纯: "純",
  纰: "紕",
  纱: "紗",
  纲: "綱",
  纳: "納",
  纵: "縱",
  纶: "綸",
  纷: "紛",
  纸: "紙",
  纹: "紋",
  纺: "紡",
  纽: "紐",
  纾: "紓",
  线: "線",
  绀: "紺",
  绁: "紲",
  绂: "紱",
  练: "練",
  组: "組",
  绅: "紳",
  细: "細",
  织: "織",
  终: "終",
  绉: "縐",
  绊: "絆",
  绋: "紼",
  绌: "絀",
  绍: "紹",
  绎: "繹",
  经: "經",
  绐: "紿",
  绑: "綁",
  绒: "絨",
  结: "結",
  绔: "絝",
  绕: "繞",
  绖: "絰",
  绘: "繪",
  给: "給",
  绚: "絢",
  绛: "絳",
  络: "絡",
  绝: "絕",
  绞: "絞",
  统: "統",
  绠: "綆",
  绡: "綃",
  绢: "絹",
  绣: "繡",
  绥: "綏",
  绦: "絛",
  继: "繼",
  绨: "綈",
  绩: "績",
  绪: "緒",
  绫: "綾",
  续: "續",
  绮: "綺",
  绯: "緋",
  绰: "綽",
  绱: "緔",
  绲: "緄",
  绳: "繩",
  维: "維",
  绵: "綿",
  绶: "綬",
  绷: "繃",
  绸: "綢",
  绺: "綹",
  绻: "綣",
  综: "綜",
  绽: "綻",
  绾: "綰",
  绿: "綠",
  缀: "綴",
  缁: "緇",
  缂: "緙",
  缃: "緗",
  缄: "緘",
  缅: "緬",
  缆: "纜",
  缇: "緹",
  缈: "緲",
  缉: "緝",
  缊: "縕",
  缋: "繢",
  缌: "緦",
  缍: "綞",
  缎: "緞",
  缏: "緶",
  缑: "緱",
  缒: "縋",
  缓: "緩",
  缔: "締",
  缕: "縷",
  编: "編",
  缗: "緡",
  缘: "緣",
  缙: "縉",
  缚: "縛",
  缛: "縟",
  缜: "縝",
  缝: "縫",
  缟: "縞",
  缠: "纏",
  缡: "縭",
  缢: "縊",
  缣: "縑",
  缤: "繽",
  缥: "縹",
  缦: "縵",
  缧: "縲",
  缨: "纓",
  缩: "縮",
  缪: "繆",
  缫: "繅",
  缬: "纈",
  缭: "繚",
  缮: "繕",
  缯: "繒",
  缰: "韁",
  缱: "繾",
  缲: "繰",
  缳: "繯",
  缴: "繳",
  缵: "纘",
  罂: "罌",
  网: "網",
  罗: "羅",
  罚: "罰",
  罢: "罷",
  羁: "羈",
  羟: "羥",
  翘: "翹",
  耢: "耮",
  耧: "耬",
  耸: "聳",
  聋: "聾",
  职: "職",
  联: "聯",
  聩: "聵",
  聪: "聰",
  肃: "肅",
  肠: "腸",
  肤: "膚",
  肮: "骯",
  肴: "餚",
  肾: "腎",
  肿: "腫",
  胀: "脹",
  胁: "脅",
  胆: "膽",
  胜: "勝",
  胧: "朧",
  胨: "腖",
  胪: "臚",
  胫: "脛",
  胶: "膠",
  脉: "脈",
  脍: "膾",
  脏: "髒",
  脐: "臍",
  脑: "腦",
  脓: "膿",
  脔: "臠",
  脚: "腳",
  脱: "脫",
  脶: "腡",
  脸: "臉",
  腊: "臘",
  腌: "醃",
  腘: "膕",
  腭: "齶",
  腻: "膩",
  腼: "靦",
  腾: "騰",
  膑: "臏",
  臜: "臢",
  舆: "輿",
  舣: "艤",
  舰: "艦",
  舱: "艙",
  艰: "艱",
  艳: "艷",
  艺: "藝",
  节: "節",
  芈: "羋",
  芗: "薌",
  芜: "蕪",
  芦: "蘆",
  苁: "蓯",
  苇: "葦",
  苈: "藶",
  苋: "莧",
  苌: "萇",
  苍: "蒼",
  苎: "苧",
  苏: "蘇",
  苹: "蘋",
  茎: "莖",
  茏: "蘢",
  茑: "蔦",
  茔: "塋",
  茕: "煢",
  茧: "繭",
  荆: "荊",
  荐: "薦",
  荙: "薘",
  荚: "莢",
  荛: "蕘",
  荜: "蓽",
  荞: "蕎",
  荟: "薈",
  荠: "薺",
  荡: "蕩",
  荣: "榮",
  荤: "葷",
  荥: "滎",
  荦: "犖",
  荧: "熒",
  荨: "蕁",
  荩: "藎",
  荪: "蓀",
  荫: "蔭",
  荬: "蕒",
  荭: "葒",
  荮: "葤",
  药: "藥",
  莅: "蒞",
  莱: "萊",
  莲: "蓮",
  莳: "蒔",
  莴: "萵",
  莶: "薟",
  获: "獲",
  莹: "瑩",
  莺: "鶯",
  莼: "蓴",
  萚: "蘀",
  萝: "蘿",
  萤: "螢",
  营: "營",
  萦: "縈",
  萧: "蕭",
  萨: "薩",
  葱: "蔥",
  蒇: "蕆",
  蒉: "蕢",
  蒋: "蔣",
  蒌: "蔞",
  蓝: "藍",
  蓟: "薊",
  蓠: "蘺",
  蓣: "蕷",
  蓥: "鎣",
  蓦: "驀",
  蔷: "薔",
  蔹: "蘞",
  蔺: "藺",
  蔼: "藹",
  蕲: "蘄",
  蕴: "蘊",
  薮: "藪",
  藓: "蘚",
  蘖: "櫱",
  虏: "虜",
  虑: "慮",
  虚: "虛",
  虫: "蟲",
  虬: "虯",
  虮: "蟣",
  虱: "蝨",
  虽: "雖",
  虾: "蝦",
  虿: "蠆",
  蚀: "蝕",
  蚁: "蟻",
  蚂: "螞",
  蚕: "蠶",
  蚝: "蠔",
  蚬: "蜆",
  蛊: "蠱",
  蛎: "蠣",
  蛏: "蟶",
  蛮: "蠻",
  蛰: "蟄",
  蛱: "蛺",
  蛲: "蟯",
  蛳: "螄",
  蛴: "蠐",
  蜕: "蛻",
  蜗: "蝸",
  蜡: "蠟",
  蝇: "蠅",
  蝈: "蟈",
  蝉: "蟬",
  蝼: "螻",
  蝾: "蠑",
  螀: "螿",
  螨: "蟎",
  蟏: "蠨",
  衅: "釁",
  衔: "銜",
  补: "補",
  表: "表",
  衬: "襯",
  衰: "衰",
  袄: "襖",
  袅: "裊",
  袜: "襪",
  袭: "襲",
  袯: "襏",
  装: "裝",
  裆: "襠",
  裢: "褳",
  裣: "襝",
  裤: "褲",
  裥: "襇",
  褛: "褸",
  褴: "襤",
  襁: "繈",
  见: "見",
  观: "觀",
  规: "規",
  觅: "覓",
  视: "視",
  览: "覽",
  觉: "覺",
  觊: "覬",
  觋: "覡",
  觌: "覿",
  觎: "覦",
  觏: "覯",
  觐: "覲",
  觑: "覷",
  觞: "觴",
  触: "觸",
  言: "言",
  订: "訂",
  讣: "訃",
  认: "認",
  讥: "譏",
  讦: "訐",
  讧: "訌",
  讨: "討",
  让: "讓",
  讪: "訕",
  讫: "訖",
  训: "訓",
  议: "議",
  讯: "訊",
  记: "記",
  讱: "訒",
  讲: "講",
  讳: "諱",
  讴: "謳",
  讵: "詎",
  讶: "訝",
  讷: "訥",
  许: "許",
  讹: "訛",
  论: "論",
  讼: "訟",
  讽: "諷",
  设: "設",
  访: "訪",
  诀: "訣",
  证: "證",
  诂: "詁",
  诃: "訶",
  评: "評",
  诅: "詛",
  识: "識",
  诈: "詐",
  诉: "訴",
  诊: "診",
  诋: "詆",
  诌: "謅",
  词: "詞",
  诎: "詘",
  诏: "詔",
  译: "譯",
  诒: "詒",
  诓: "誆",
  诔: "誄",
  试: "試",
  诖: "詿",
  诗: "詩",
  诘: "詰",
  诙: "詼",
  诚: "誠",
  诛: "誅",
  诜: "詵",
  话: "話",
  诞: "誕",
  诟: "詬",
  诠: "詮",
  诡: "詭",
  询: "詢",
  诣: "詣",
  诤: "諍",
  该: "該",
  详: "詳",
  诧: "詫",
  诨: "諢",
  诩: "詡",
  诫: "誡",
  诬: "誣",
  语: "語",
  诮: "誚",
  误: "誤",
  诰: "誥",
  诱: "誘",
  诲: "誨",
  诳: "誑",
  说: "說",
  诵: "誦",
  诶: "誒",
  请: "請",
  诸: "諸",
  诹: "諏",
  诺: "諾",
  读: "讀",
  诼: "諑",
  诽: "誹",
  课: "課",
  诿: "諉",
  谀: "諛",
  谁: "誰",
  谂: "諗",
  调: "調",
  谄: "諂",
  谅: "諒",
  谆: "諄",
  谇: "誶",
  谈: "談",
  谊: "誼",
  谋: "謀",
  谌: "諶",
  谍: "諜",
  谎: "謊",
  谏: "諫",
  谐: "諧",
  谑: "謔",
  谒: "謁",
  谓: "謂",
  谔: "諤",
  谕: "諭",
  谖: "諼",
  谗: "讒",
  谘: "諮",
  谙: "諳",
  谚: "諺",
  谛: "諦",
  谜: "謎",
  谝: "諞",
  谞: "諝",
  谟: "謨",
  谠: "讜",
  谡: "謖",
  谢: "謝",
  谣: "謠",
  谤: "謗",
  谥: "謚",
  谦: "謙",
  谧: "謐",
  谨: "謹",
  谩: "謾",
  谪: "謫",
  谫: "譾",
  谬: "謬",
  谭: "譚",
  谮: "譖",
  谯: "譙",
  谰: "讕",
  谱: "譜",
  谲: "譎",
  谳: "讞",
  谴: "譴",
  谵: "譫",
  谶: "讖",
  贝: "貝",
  贞: "貞",
  负: "負",
  财: "財",
  贡: "貢",
  贫: "貧",
  货: "貨",
  贩: "販",
  贪: "貪",
  贯: "貫",
  责: "責",
  贮: "貯",
  贰: "貳",
  贵: "貴",
  贬: "貶",
  买: "買",
  贷: "貸",
  费: "費",
  贴: "貼",
  贻: "貽",
  贸: "貿",
  贺: "賀",
  贲: "賁",
  贳: "貰",
  贽: "贄",
  贾: "賈",
  贿: "賄",
  赁: "賃",
  赂: "賂",
  赃: "贓",
  资: "資",
  赅: "賅",
  赈: "賑",
  赉: "賚",
  赊: "賒",
  赋: "賦",
  赌: "賭",
  赍: "齎",
  赎: "贖",
  赏: "賞",
  赐: "賜",
  赑: "贔",
  赒: "賙",
  赔: "賠",
  赖: "賴",
  赗: "賵",
  赚: "賺",
  赛: "賽",
  赜: "賾",
  赝: "贗",
  赞: "贊",
  赠: "贈",
  赡: "贍",
  赢: "贏",
  赣: "贛",
  赵: "趙",
  赶: "趕",
  趋: "趨",
  趱: "趲",
  跃: "躍",
  跄: "蹌",
  跞: "躒",
  践: "踐",
  跷: "蹺",
  跸: "蹕",
  跹: "躚",
  跻: "躋",
  踊: "踴",
  踌: "躊",
  踪: "蹤",
  踬: "躓",
  踯: "躑",
  蹑: "躡",
  蹒: "蹣",
  蹰: "躕",
  蹿: "躥",
  躏: "躪",
  躜: "躦",
  躯: "軀",
  车: "車",
  轧: "軋",
  轨: "軌",
  轩: "軒",
  轫: "軔",
  转: "轉",
  轭: "軛",
  轮: "輪",
  软: "軟",
  轰: "轟",
  轱: "軲",
  轲: "軻",
  轳: "轤",
  轴: "軸",
  轵: "軹",
  轶: "軼",
  轷: "軤",
  轸: "軫",
  轹: "轢",
  轺: "軺",
  轻: "輕",
  轼: "軾",
  载: "載",
  轾: "輊",
  轿: "轎",
  辁: "輇",
  辂: "輅",
  较: "較",
  辄: "輒",
  辅: "輔",
  辆: "輛",
  辇: "輦",
  辈: "輩",
  辉: "輝",
  辊: "輥",
  辋: "輞",
  辍: "輟",
  辎: "輜",
  辏: "輳",
  辐: "輻",
  辑: "輯",
  输: "輸",
  辔: "轡",
  辕: "轅",
  辖: "轄",
  辗: "輾",
  辘: "轆",
  辙: "轍",
  辚: "轔",
  辞: "辭",
  辩: "辯",
  辫: "辮",
  边: "邊",
  辽: "遼",
  达: "達",
  迁: "遷",
  过: "過",
  迈: "邁",
  运: "運",
  还: "還",
  这: "這",
  进: "進",
  远: "遠",
  违: "違",
  连: "連",
  迟: "遲",
  迩: "邇",
  迳: "逕",
  迹: "跡",
  适: "適",
  选: "選",
  逊: "遜",
  递: "遞",
  逻: "邏",
  遗: "遺",
  遥: "遙",
  邓: "鄧",
  邝: "鄺",
  邬: "鄔",
  邮: "郵",
  邻: "鄰",
  郁: "鬱",
  郑: "鄭",
  郓: "鄆",
  郦: "酈",
  郧: "鄖",
  郸: "鄲",
  酝: "醞",
  酦: "醱",
  酱: "醬",
  酽: "釅",
  酾: "釃",
  酿: "釀",
  释: "釋",
  里: "裡",
  针: "針",
  钉: "釘",
  钊: "釗",
  钋: "釙",
  钌: "釕",
  钍: "釷",
  钎: "釺",
  钏: "釧",
  钐: "釤",
  钑: "鈒",
  钒: "釩",
  钓: "釣",
  钔: "鍆",
  钕: "釹",
  钖: "鍚",
  钗: "釵",
  钘: "鈃",
  钙: "鈣",
  钚: "鈈",
  钛: "鈦",
  钜: "鉅",
  钝: "鈍",
  钞: "鈔",
  钟: "鐘",
  钠: "鈉",
  钡: "鋇",
  钢: "鋼",
  钣: "鈑",
  钤: "鈐",
  钥: "鑰",
  钦: "欽",
  钧: "鈞",
  钨: "鎢",
  钩: "鉤",
  钪: "鈧",
  钫: "鈁",
  钬: "鈥",
  钭: "鈄",
  钮: "鈕",
  钯: "鈀",
  钰: "鈺",
  钱: "錢",
  钲: "鉦",
  钳: "鉗",
  钴: "鈷",
  钵: "缽",
  钶: "鈳",
  钷: "鉕",
  钸: "鈽",
  钹: "鈸",
  钺: "鉞",
  钻: "鑽",
  钼: "鉬",
  钽: "鉭",
  钾: "鉀",
  钿: "鈿",
  铀: "鈾",
  铁: "鐵",
  铂: "鉑",
  铃: "鈴",
  铄: "鑠",
  铅: "鉛",
  铆: "鉚",
  铈: "鈰",
  铉: "鉉",
  铊: "鉈",
  铋: "鉍",
  铌: "鈮",
  铍: "鈹",
  铎: "鐸",
  铐: "銬",
  铑: "銠",
  铒: "鉺",
  铕: "銪",
  铖: "鋮",
  铗: "鋏",
  铘: "鋣",
  铙: "鐃",
  铛: "鐺",
  铜: "銅",
  铝: "鋁",
  铞: "銱",
  铟: "銦",
  铠: "鎧",
  铡: "鍘",
  铢: "銖",
  铣: "銑",
  铤: "鋌",
  铥: "銩",
  铧: "鏵",
  铨: "銓",
  铩: "鎩",
  铪: "鉿",
  铫: "銚",
  铬: "鉻",
  铭: "銘",
  铮: "錚",
  铯: "銫",
  铰: "鉸",
  铱: "銥",
  铲: "鏟",
  铳: "銃",
  铴: "鐋",
  铵: "銨",
  银: "銀",
  铷: "銣",
  铸: "鑄",
  铹: "鐒",
  铺: "鋪",
  铻: "鋙",
  铼: "錸",
  铽: "鋱",
  链: "鏈",
  铿: "鏗",
  销: "銷",
  锁: "鎖",
  锂: "鋰",
  锃: "鋥",
  锄: "鋤",
  锅: "鍋",
  锆: "鋯",
  锇: "鋨",
  锈: "鏽",
  锉: "銼",
  锊: "鋝",
  锋: "鋒",
  锌: "鋅",
  锍: "鋶",
  锎: "鐦",
  锏: "鐧",
  锐: "銳",
  锑: "銻",
  锒: "鋃",
  锓: "鋟",
  锔: "鋦",
  锕: "錒",
  锖: "錆",
  锗: "鍺",
  锘: "鍩",
  错: "錯",
  锚: "錨",
  锛: "錛",
  锜: "錡",
  锝: "鍀",
  锞: "錁",
  锟: "錕",
  锡: "錫",
  锢: "錮",
  锣: "鑼",
  锤: "錘",
  锥: "錐",
  锦: "錦",
  锧: "鑕",
  锨: "鍁",
  锩: "錈",
  锪: "鍃",
  锫: "錇",
  锬: "錟",
  锭: "錠",
  键: "鍵",
  锯: "鋸",
  锰: "錳",
  锱: "錙",
  锲: "鍥",
  锳: "鍈",
  锴: "鍇",
  锵: "鏘",
  锶: "鍶",
  锷: "鍔",
  锸: "鍤",
  锹: "鍬",
  锺: "鍾",
  锻: "鍛",
  锼: "鎪",
  锽: "鍠",
  锾: "鍰",
  锿: "鎄",
  镀: "鍍",
  镁: "鎂",
  镂: "鏤",
  镃: "鎡",
  镄: "鐨",
  镅: "鎇",
  镆: "鏌",
  镇: "鎮",
  镈: "鎛",
  镉: "鎘",
  镊: "鑷",
  镋: "钂",
  镌: "鐫",
  镍: "鎳",
  镎: "鎿",
  镏: "鎦",
  镐: "鎬",
  镑: "鎊",
  镒: "鎰",
  镓: "鎵",
  镔: "鑌",
  镕: "鎔",
  镖: "鏢",
  镗: "鏜",
  镘: "鏝",
  镙: "鏍",
  镚: "鏰",
  镛: "鏞",
  镜: "鏡",
  镝: "鏑",
  镞: "鏃",
  镟: "鏇",
  镠: "鏐",
  镡: "鐔",
  镢: "钁",
  镣: "鐐",
  镤: "鏷",
  镥: "鑥",
  镦: "鐓",
  镧: "鑭",
  镨: "鐠",
  镩: "鑹",
  镪: "鏹",
  镫: "鐙",
  镬: "鑊",
  镭: "鐳",
  镮: "鐶",
  镯: "鐲",
  镰: "鐮",
  镱: "鐿",
  镲: "鑔",
  镳: "鑣",
  镴: "鑞",
  门: "門",
  闩: "閂",
  闪: "閃",
  闫: "閆",
  闭: "閉",
  问: "問",
  闯: "闖",
  闰: "閏",
  闱: "闈",
  闲: "閒",
  闳: "閎",
  间: "間",
  闵: "閔",
  闶: "閌",
  闷: "悶",
  闸: "閘",
  闹: "鬧",
  闺: "閨",
  闻: "聞",
  闼: "闥",
  闽: "閩",
  闾: "閭",
  闿: "闓",
  阀: "閥",
  阁: "閣",
  阂: "閡",
  阃: "閫",
  阄: "鬮",
  阅: "閱",
  阆: "閬",
  阇: "闍",
  阈: "閾",
  阉: "閹",
  阊: "閶",
  阋: "鬩",
  阌: "閿",
  阍: "閽",
  阎: "閻",
  阏: "閼",
  阐: "闡",
  阑: "闌",
  阒: "闃",
  阔: "闊",
  阕: "闋",
  阖: "闔",
  阗: "闐",
  阘: "闒",
  阙: "闕",
  阚: "闞",
  队: "隊",
  阳: "陽",
  阴: "陰",
  阵: "陣",
  阶: "階",
  际: "際",
  陆: "陸",
  陇: "隴",
  陈: "陳",
  陉: "陘",
  陕: "陝",
  陧: "隉",
  陨: "隕",
  险: "險",
  随: "隨",
  隐: "隱",
  隶: "隸",
  难: "難",
  雏: "雛",
  雠: "讎",
  雳: "靂",
  雾: "霧",
  霁: "霽",
  霉: "黴",
  霭: "靄",
  靓: "靚",
  静: "靜",
  靥: "靨",
  鞑: "韃",
  鞒: "鞽",
  鞯: "韉",
  韦: "韋",
  韧: "韌",
  韩: "韓",
  韪: "韙",
  韫: "韞",
  韬: "韜",
  页: "頁",
  顶: "頂",
  顷: "頃",
  项: "項",
  顺: "順",
  须: "須",
  顼: "頊",
  顽: "頑",
  顾: "顧",
  顿: "頓",
  颀: "頎",
  颁: "頒",
  颂: "頌",
  颃: "頏",
  预: "預",
  颅: "顱",
  领: "領",
  颇: "頗",
  颈: "頸",
  颉: "頡",
  颊: "頰",
  颌: "頜",
  颍: "潁",
  颎: "熲",
  颏: "頦",
  颐: "頤",
  频: "頻",
  颓: "頹",
  颔: "頷",
  颖: "穎",
  颗: "顆",
  题: "題",
  颚: "顎",
  颛: "顓",
  颜: "顏",
  额: "額",
  颞: "顳",
  颟: "顢",
  颠: "顛",
  颡: "顙",
  颢: "顥",
  颤: "顫",
  颥: "顬",
  颦: "顰",
  风: "風",
  飐: "颭",
  飒: "颯",
  飓: "颶",
  飔: "颸",
  飕: "颼",
  飖: "颻",
  飘: "飄",
  飙: "飆",
  飚: "飈",
  飞: "飛",
  食: "食",
  飨: "饗",
  餍: "饜",
  餐: "餐",
  饥: "飢",
  饧: "餳",
  饨: "飩",
  饩: "餼",
  饪: "飪",
  饫: "飫",
  饬: "飭",
  饭: "飯",
  饮: "飲",
  饯: "餞",
  饰: "飾",
  饱: "飽",
  饲: "飼",
  饳: "飿",
  饴: "飴",
  饵: "餌",
  饶: "饒",
  饷: "餉",
  饸: "餄",
  饹: "餎",
  饺: "餃",
  饻: "餏",
  饼: "餅",
  饽: "餑",
  饾: "餖",
  饿: "餓",
  馀: "餘",
  馁: "餒",
  馂: "餕",
  馃: "餜",
  馄: "餛",
  馅: "餡",
  馆: "館",
  馇: "餷",
  馈: "饋",
  馉: "餶",
  馊: "餿",
  馋: "饞",
  馌: "饁",
  馍: "饃",
  馎: "餺",
  馏: "餾",
  馐: "饈",
  馑: "饉",
  馒: "饅",
  馓: "饊",
  馔: "饌",
  馕: "饢",
  马: "馬",
  驭: "馭",
  驮: "馱",
  驯: "馴",
  驰: "馳",
  驱: "驅",
  驲: "馹",
  驳: "駁",
  驴: "驢",
  驵: "駔",
  驶: "駛",
  驷: "駟",
  驸: "駙",
  驹: "駒",
  驺: "騶",
  驻: "駐",
  驼: "駝",
  驽: "駑",
  驾: "駕",
  驿: "驛",
  骀: "駘",
  骁: "驍",
  骂: "罵",
  骄: "驕",
  骅: "驊",
  骆: "駱",
  骇: "駭",
  骈: "駢",
  骊: "驪",
  骋: "騁",
  验: "驗",
  骎: "駸",
  骏: "駿",
  骐: "騏",
  骑: "騎",
  骒: "騍",
  骓: "騅",
  骖: "驂",
  骗: "騙",
  骘: "騭",
  骚: "騷",
  骛: "騖",
  骜: "驁",
  骝: "騮",
  骞: "騫",
  骟: "騸",
  骠: "驃",
  骡: "騾",
  骢: "驄",
  骣: "驏",
  骤: "驟",
  骥: "驥",
  骧: "驤",
  髅: "髏",
  髋: "髖",
  髌: "髕",
  鬓: "鬢",
  魇: "魘",
  鱼: "魚",
  鱿: "魷",
  鲁: "魯",
  鲂: "魴",
  鲅: "鮁",
  鲆: "鮃",
  鲇: "鯰",
  鲈: "鱸",
  鲋: "鮒",
  鲍: "鮑",
  鲎: "鱟",
  鲐: "鮐",
  鲑: "鮭",
  鲒: "鮚",
  鲔: "鮪",
  鲕: "鮞",
  鲚: "鱭",
  鲛: "鮫",
  鲜: "鮮",
  鲞: "鯗",
  鲟: "鱘",
  鲠: "鯁",
  鲡: "鱺",
  鲢: "鰱",
  鲣: "鰹",
  鲤: "鯉",
  鲥: "鰣",
  鲦: "鰷",
  鲧: "鯀",
  鲨: "鯊",
  鲩: "鯇",
  鲫: "鯽",
  鲭: "鯖",
  鲮: "鯪",
  鲰: "鯫",
  鲱: "鯡",
  鲲: "鯤",
  鲳: "鯧",
  鲴: "鯝",
  鲵: "鯢",
  鲶: "鯰",
  鲷: "鯛",
  鲸: "鯨",
  鲺: "鯴",
  鲻: "鯔",
  鲼: "鱝",
  鲽: "鰈",
  鲾: "鰏",
  鳃: "鰓",
  鳄: "鱷",
  鳅: "鰍",
  鳆: "鰒",
  鳇: "鰉",
  鳌: "鰲",
  鳍: "鰭",
  鳎: "鰨",
  鳏: "鰥",
  鳐: "鰩",
  鳓: "鰳",
  鳔: "鰾",
  鳕: "鱈",
  鳖: "鱉",
  鳗: "鰻",
  鳘: "鰵",
  鳙: "鱅",
  鳜: "鱖",
  鳝: "鱔",
  鳞: "鱗",
  鳟: "鱒",
  鸟: "鳥",
  鸠: "鳩",
  鸡: "雞",
  鸢: "鳶",
  鸣: "鳴",
  鸥: "鷗",
  鸦: "鴉",
  鸧: "鶬",
  鸨: "鴇",
  鸩: "鴆",
  鸪: "鴣",
  鸫: "鶇",
  鸬: "鸕",
  鸭: "鴨",
  鸮: "鴞",
  鸯: "鴦",
  鸰: "鴒",
  鸱: "鴟",
  鸲: "鴝",
  鸳: "鴛",
  鸵: "鴕",
  鸶: "鷥",
  鸷: "鷙",
  鸸: "鴯",
  鸹: "鴰",
  鸺: "鵂",
  鸻: "鴴",
  鸼: "鵃",
  鸽: "鴿",
  鸾: "鸞",
  鸿: "鴻",
  鹁: "鵓",
  鹂: "鸝",
  鹃: "鵑",
  鹄: "鵠",
  鹅: "鵝",
  鹆: "鵒",
  鹇: "鷳",
  鹈: "鵜",
  鹉: "鵡",
  鹊: "鵲",
  鹋: "鶓",
  鹌: "鵪",
  鹎: "鵯",
  鹏: "鵬",
  鹑: "鶉",
  鹒: "鶊",
  鹓: "鵷",
  鹔: "鷫",
  鹕: "鶘",
  鹖: "鶡",
  鹗: "鶚",
  鹘: "鶻",
  鹚: "鷀",
  鹛: "鶥",
  鹜: "鶩",
  鹞: "鷂",
  鹟: "鶲",
  鹠: "鶹",
  鹡: "鶺",
  鹢: "鷁",
  鹣: "鶼",
  鹤: "鶴",
  鹥: "鷖",
  鹦: "鸚",
  鹧: "鷓",
  鹨: "鷚",
  鹩: "鷯",
  鹪: "鷦",
  鹫: "鷲",
  鹬: "鷸",
  鹭: "鷺",
  鹯: "鸇",
  鹰: "鷹",
  鹱: "鸌",
  鹲: "鸏",
  鹳: "鸛",
  鹴: "鸘",
  麦: "麥",
  麸: "麩",
  黄: "黃",
  黉: "黌",
  点: "點",
  齐: "齊",
  齑: "齏",
  齿: "齒",
  龄: "齡",
  龃: "齟",
  龄: "齡",
  龅: "齙",
  龆: "齠",
  龇: "齜",
  龈: "齦",
  龉: "齬",
  龊: "齪",
  龋: "齲",
  龌: "齷",
  龙: "龍",
  龚: "龔",
  龛: "龕",
};

const SORT_OPTIONS = {
  cases: [
    ["date-desc", "sortDateDesc"],
    ["date-asc", "sortDateAsc"],
    ["title-asc", "sortTitleAsc"],
    ["region-asc", "sortRegionAsc"],
  ],
  resources: [
    ["title-asc", "sortTitleAsc"],
    ["region-asc", "sortRegionAsc"],
    ["date-desc", "sortDateDesc"],
    ["date-asc", "sortDateAsc"],
    ["publisher-asc", "sortPublisherAsc"],
  ],
  prompts: [
    ["subject-asc", "sortSubjectAsc"],
    ["type-asc", "sortTypeAsc"],
    ["title-asc", "sortTitleAsc"],
  ],
};

const viewState = {
  active: "cases",
};

const languageState = {
  current: initialLanguage(),
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

const assistantState = {
  studioUrl: "",
  hasConfigError: false,
};

const viewElements = {
  tabs: [...document.querySelectorAll("[data-view]")],
  panels: [...document.querySelectorAll("[data-view-panel]")],
  languageSelect: document.querySelector("#languageSelect"),
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

function initialLanguage() {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = localStorage.getItem("aied-language");
  if (SUPPORTED_LANGUAGES.includes(urlLanguage)) return urlLanguage;
  if (SUPPORTED_LANGUAGES.includes(savedLanguage)) return savedLanguage;
  return "zh-Hans";
}

function t(key, values = {}) {
  const source =
    TEXT[languageState.current]?.[key] ??
    TEXT["zh-Hans"][key] ??
    key;
  const localized = languageState.current === "zh-Hant" ? toTraditional(source) : source;
  return localized.replace(/\{(\w+)\}/g, (_, name) => values[name] ?? "");
}

function toTraditional(value) {
  let text = String(value ?? "");
  TRADITIONAL_PHRASES.forEach(([from, to]) => {
    text = text.replaceAll(from, to);
  });
  return [...text].map((char) => TRADITIONAL_CHARS[char] || char).join("");
}

function localizeText(value) {
  if (!value) return "";
  if (languageState.current === "zh-Hant") return toTraditional(value);
  return value;
}

function localizeValue(value) {
  if (!value) return "";
  if (languageState.current === "en" && VALUE_EN[value]) return VALUE_EN[value];
  return localizeText(value);
}

function localizeTitle(item, titleKey = "title_cn") {
  if (languageState.current === "en" && item.title_original) return item.title_original;
  return localizeText(item[titleKey] || item.title_original || "");
}

function localizeSecondaryTitle(item, titleKey = "title_cn") {
  if (languageState.current === "en") {
    return localizeText(item[titleKey] || item.subject || item.title_original || "");
  }
  return localizeText(
    item.title_original && item.title_original !== item[titleKey] ? item.title_original : item.subject
  );
}

function updateLanguageOptions() {
  viewElements.languageSelect.querySelectorAll("option").forEach((option) => {
    option.textContent = LANGUAGE_LABELS[option.value] || option.textContent;
  });
}

function applyStaticTranslations() {
  document.documentElement.lang = LANGUAGE_META[languageState.current].htmlLang;
  document.title = t("documentTitle");
  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", t("documentDescription"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });
}

function setSortOptions(select, options, selectedValue) {
  select.innerHTML = "";
  options.forEach(([value, labelKey]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = t(labelKey);
    select.append(option);
  });
  select.value = selectedValue;
}

function renderSortOptions() {
  setSortOptions(caseEls.sort, SORT_OPTIONS.cases, caseState.sort);
  setSortOptions(resourceEls.sort, SORT_OPTIONS.resources, resourceState.sort);
  setSortOptions(promptEls.sort, SORT_OPTIONS.prompts, promptState.sort);
}

function refreshLanguage() {
  updateLanguageOptions();
  applyStaticTranslations();
  renderSortOptions();
  if (caseState.items.length > 0) {
    populateCaseControls();
    renderCaseStats();
    renderCases();
  }
  if (resourceState.items.length > 0) {
    populateResourceControls();
    renderResourceStats();
    renderResources();
  }
  if (promptState.items.length > 0) {
    populatePromptControls();
    renderPromptStats();
    renderPrompts();
  }
  renderAssistant(assistantState.studioUrl);
}

function setupLanguageControl() {
  viewElements.languageSelect.value = languageState.current;
  updateLanguageOptions();
  viewElements.languageSelect.addEventListener("change", (event) => {
    languageState.current = event.target.value;
    localStorage.setItem("aied-language", languageState.current);
    refreshLanguage();
  });
}

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
    localizeValue(a).localeCompare(localizeValue(b), LANGUAGE_META[languageState.current].locale)
  );
}

function fillSelect(select, values) {
  const currentValue = select.value;
  select.innerHTML = "";
  ["全部", ...values].forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = localizeValue(value);
    select.append(option);
  });
  if ([...select.options].some((option) => option.value === currentValue)) {
    select.value = currentValue;
  }
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
  tag.textContent = localizeValue(text);
  return tag;
}

function createMeta(label, value) {
  const wrapper = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value ? localizeValue(value) : t("notMarked");
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
      button.textContent = t("copied");
    } catch {
      button.textContent = t("copyFailed");
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
  previous.textContent = t("previousPage");
  previous.disabled = state.page === 1;
  previous.addEventListener("click", () => {
    state.page -= 1;
    render();
    target.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  const status = document.createElement("span");
  status.className = "page-status";
  status.textContent = t("pageStatus", { page: state.page, totalPages });

  const next = document.createElement("button");
  next.className = "page-button";
  next.type = "button";
  next.textContent = t("nextPage");
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
  viewElements.assistantTabStatus.textContent = t("assistantStatusPending");
}

function renderAssistant(studioUrl) {
  if (assistantState.hasConfigError) {
    showAssistantEmpty(t("assistantLoadErrorTitle"), t("assistantLoadErrorCopy", { url: RAG_CONFIG_URL }));
    return;
  }

  const url = (studioUrl || "").trim();
  if (!url) {
    showAssistantEmpty(t("assistantEmptyTitle"), t("assistantEmptyCopy"));
    return;
  }

  assistantState.studioUrl = url;
  assistantEls.frame.src = url;
  assistantEls.frameWrap.hidden = false;
  assistantEls.empty.hidden = true;
  assistantEls.directLink.href = url;
  assistantEls.directLink.hidden = false;
  viewElements.assistantTabStatus.textContent = t("assistantStatusConnected");
}

async function initAssistant() {
  try {
    const response = await fetch(RAG_CONFIG_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const config = await response.json();
    assistantState.hasConfigError = false;
    renderAssistant(config.studio_url);
  } catch (error) {
    assistantState.hasConfigError = true;
    showAssistantEmpty(t("assistantLoadErrorTitle"), t("assistantLoadErrorCopy", { url: RAG_CONFIG_URL }));
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
  if (item.workflow_cn) return localizeText(item.workflow_cn);
  const topic = localizeValue(item.subject || item.subcategory || item.category);
  const tool = localizeValue(item.ai_tool_or_method || "AI工具");
  return [
    `${t("fallbackCaseLabel")}：${localizeTitle(item)}`,
    t("fallbackCaseGoal", { topic }),
    t("fallbackCaseFlow", { tool }),
    t("fallbackCaseOutput"),
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
    title.textContent = localizeTitle(item);

    const original = document.createElement("p");
    original.className = "original-title";
    original.textContent = localizeSecondaryTitle(item);

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = localizeText(item.summary_cn);

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta(t("subcategory"), item.subcategory),
      createMeta(t("educationLevel"), item.education_level),
      createMeta(t("language"), item.language),
      createMeta(t("region"), item.region),
      createMeta(t("aiType"), item.ai_tool_or_method)
    );

    const workflow = workflowText(item);
    const workflowBlock = document.createElement("div");
    workflowBlock.className = "workflow-block";
    const workflowHeader = document.createElement("div");
    workflowHeader.className = "workflow-header";
    const workflowTitle = document.createElement("h4");
    workflowTitle.textContent = t("workflowTitle");
    workflowHeader.append(workflowTitle, createCopyButton(workflow, t("copyWorkflow")));
    const workflowContent = document.createElement("pre");
    workflowContent.textContent = workflow;
    workflowBlock.append(workflowHeader, workflowContent);

    const footer = document.createElement("div");
    footer.className = "card-footer";
    const date = document.createElement("span");
    date.className = "date";
    date.textContent = `${t("published")}：${item.published_date || t("notMarked")} · ${t("accessed")}：${
      item.accessed_date
    }`;
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = item.source_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = t("viewSource");

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
    button.textContent = localizeValue(category);
    button.addEventListener("click", () => {
      caseState.category = category;
      caseState.subcategory = "全部";
      caseState.page = 1;
      populateCaseControls();
      renderCases();
    });
    caseEls.tabs.append(button);
  });
}

function renderCaseStats() {
  const accessedDates = caseState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  caseEls.total.textContent = caseState.items.length;
  viewElements.caseTabCount.textContent = t("caseCount", { count: caseState.items.length });
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
  caseEls.resultsTitle.textContent = caseState.category === "全部" ? t("allCases") : localizeValue(caseState.category);
  caseEls.resultsMeta.textContent =
    items.length === 0
      ? t("caseResultsEmpty", { total: caseState.items.length })
      : t("caseResultsRange", {
          first: page.first,
          last: page.last,
          shown: items.length,
          total: caseState.items.length,
        });
}

function populateCaseControls() {
  fillSelect(caseEls.subcategory, caseSubcategories());
  fillSelect(caseEls.level, uniqueValues(caseState.items, "education_level"));
  fillSelect(caseEls.language, uniqueValues(caseState.items, "language"));
  fillSelect(caseEls.region, uniqueValues(caseState.items, "region"));
  fillSelect(caseEls.source, uniqueValues(caseState.items, "source_type"));
  fillSelect(caseEls.method, uniqueValues(caseState.items, "ai_tool_or_method"));
  caseEls.subcategory.value = caseState.subcategory;
  caseEls.level.value = caseState.level;
  caseEls.language.value = caseState.language;
  caseEls.region.value = caseState.region;
  caseEls.source.value = caseState.source;
  caseEls.method.value = caseState.method;
  caseEls.sort.value = caseState.sort;
}

function setupCaseControls() {
  populateCaseControls();
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
    populateCaseControls();
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
    title.textContent = localizeTitle(item);

    const original = document.createElement("p");
    original.className = "original-title";
    original.textContent = localizeSecondaryTitle(item);

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = localizeText(item.summary_cn);

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta(t("category"), item.category),
      createMeta(t("publisher"), item.publisher),
      createMeta(t("educationLevel"), item.education_level),
      createMeta(t("audience"), item.audience),
      createMeta(t("language"), item.language),
      createMeta(t("subjectTopic"), item.subject)
    );

    const useBlock = document.createElement("div");
    useBlock.className = "workflow-block resource-use-block";
    const useHeader = document.createElement("div");
    useHeader.className = "workflow-header";
    const useTitle = document.createElement("h4");
    useTitle.textContent = t("useCase");
    const useText = document.createElement("p");
    useText.textContent = localizeText(item.use_case_cn);
    useHeader.append(useTitle);
    useBlock.append(useHeader, useText);

    const footer = document.createElement("div");
    footer.className = "card-footer";
    const date = document.createElement("span");
    date.className = "date";
    date.textContent = `${t("published")}：${item.published_date || t("notMarked")} · ${t("accessed")}：${
      item.accessed_date
    }`;
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = item.source_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = t("openResource");

    footer.append(date, link);
    card.append(topline, title, original, summary, meta, useBlock, footer);
    resourceEls.cards.append(card);
  });
}

function renderResourceStats() {
  const accessedDates = resourceState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  resourceEls.total.textContent = resourceState.items.length;
  viewElements.resourceTabCount.textContent = t("resourceCount", { count: resourceState.items.length });
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
    resourceState.category === "全部"
      ? t("allResources")
      : t("resourceTitle", { category: localizeValue(resourceState.category) });
  resourceEls.resultsMeta.textContent =
    items.length === 0
      ? t("resourceResultsEmpty", { total: resourceState.items.length })
      : t("resourceResultsRange", {
          first: page.first,
          last: page.last,
          shown: items.length,
          total: resourceState.items.length,
        });
}

function populateResourceControls() {
  fillSelect(resourceEls.region, uniqueValues(resourceState.items, "region"));
  fillSelect(resourceEls.level, uniqueValues(resourceState.items, "education_level"));
  fillSelect(resourceEls.audience, uniqueValues(resourceState.items, "audience"));
  fillSelect(resourceEls.resourceType, uniqueValues(resourceState.items, "resource_type"));
  fillSelect(resourceEls.category, uniqueValues(resourceState.items, "category"));
  fillSelect(resourceEls.language, uniqueValues(resourceState.items, "language"));
  fillSelect(resourceEls.accessType, uniqueValues(resourceState.items, "access_type"));
  resourceEls.region.value = resourceState.region;
  resourceEls.level.value = resourceState.level;
  resourceEls.audience.value = resourceState.audience;
  resourceEls.resourceType.value = resourceState.resourceType;
  resourceEls.category.value = resourceState.category;
  resourceEls.language.value = resourceState.language;
  resourceEls.accessType.value = resourceState.accessType;
  resourceEls.sort.value = resourceState.sort;
}

function setupResourceControls() {
  populateResourceControls();
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
    populateResourceControls();
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
    title.textContent = localizeText(item.title_cn);

    const summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = localizeText(item.use_case_cn);

    const meta = document.createElement("dl");
    meta.className = "meta-list";
    meta.append(
      createMeta(t("educationLevel"), item.education_level),
      createMeta(t("audience"), item.audience),
      createMeta(t("outputFormatMeta"), item.output_format),
      createMeta(t("aiTool"), item.ai_tool_or_method)
    );

    const prompt = localizeText(item.prompt_cn);
    const promptBlock = document.createElement("div");
    promptBlock.className = "workflow-block prompt-block";
    const promptHeader = document.createElement("div");
    promptHeader.className = "workflow-header";
    const promptTitle = document.createElement("h4");
    promptTitle.textContent = t("promptCopyTitle");
    promptHeader.append(promptTitle, createCopyButton(prompt, t("copyPrompt")));
    const promptText = document.createElement("pre");
    promptText.textContent = prompt;
    promptBlock.append(promptHeader, promptText);

    const footer = document.createElement("div");
    footer.className = "card-footer";
    const source = document.createElement("span");
    source.className = "date";
    source.textContent = `${t("reference")}：${localizeText(item.source_title)} · ${t("accessed")}：${
      item.accessed_date
    }`;
    const link = document.createElement("a");
    link.className = "source-link";
    link.href = item.source_url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = t("sourceLink");

    footer.append(source, link);
    card.append(topline, title, summary, meta, promptBlock, footer);
    promptEls.cards.append(card);
  });
}

function renderPromptStats() {
  const accessedDates = promptState.items.map((item) => item.accessed_date).filter(Boolean).sort();
  promptEls.total.textContent = promptState.items.length;
  viewElements.promptTabCount.textContent = t("promptCount", { count: promptState.items.length });
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
    promptState.subject === "全部"
      ? t("allPrompts")
      : t("promptTitle", { subject: localizeValue(promptState.subject) });
  promptEls.resultsMeta.textContent =
    items.length === 0
      ? t("promptResultsEmpty", { total: promptState.items.length })
      : t("promptResultsRange", {
          first: page.first,
          last: page.last,
          shown: items.length,
          total: promptState.items.length,
        });
}

function populatePromptControls() {
  fillSelect(promptEls.subject, uniqueValues(promptState.items, "subject"));
  fillSelect(promptEls.level, uniqueValues(promptState.items, "education_level"));
  fillSelect(promptEls.promptType, uniqueValues(promptState.items, "prompt_type"));
  fillSelect(promptEls.category, uniqueValues(promptState.items, "category"));
  fillSelect(promptEls.audience, uniqueValues(promptState.items, "audience"));
  fillSelect(promptEls.outputFormat, uniqueValues(promptState.items, "output_format"));
  promptEls.subject.value = promptState.subject;
  promptEls.level.value = promptState.level;
  promptEls.promptType.value = promptState.promptType;
  promptEls.category.value = promptState.category;
  promptEls.audience.value = promptState.audience;
  promptEls.outputFormat.value = promptState.outputFormat;
  promptEls.sort.value = promptState.sort;
}

function setupPromptControls() {
  populatePromptControls();
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
    populatePromptControls();
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
  elements.resultsTitle.textContent = t("loadErrorTitle");
  elements.resultsMeta.textContent = t("loadErrorMeta", { url });
  elements.empty.hidden = false;
  elements.empty.querySelector("h2").textContent = t("csvErrorTitle");
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

setupLanguageControl();
refreshLanguage();
setupViewTabs();
initCases();
initResources();
initPrompts();
initAssistant();
