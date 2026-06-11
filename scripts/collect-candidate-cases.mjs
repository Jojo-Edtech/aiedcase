import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { CASE_FIELDS, parseCsv, toCsv } from './csv-utils.mjs';

const CASES_PATH = process.env.CASES_PATH || 'data/cases.csv';
const CANDIDATES_PATH = process.env.CANDIDATES_PATH || 'data/candidate_cases.csv';
const FEEDS_PATH = process.env.FEEDS_PATH || 'data/source_feeds.json';
const SUMMARY_PATH = process.env.SUMMARY_FILE || '.tmp/candidate_update_summary.md';
const MAX_NEW_CANDIDATES = Number(process.env.MAX_NEW_CANDIDATES || 30);

const categories = [
  'AI Literacy',
  'AI+STEM',
  'AI+Humanities',
  'AI+Social Sciences',
  'AI for Teaching & Assessment',
];

const aiTerms = [
  'ai',
  'artificial intelligence',
  'generative ai',
  'chatgpt',
  'machine learning',
  'large language model',
  'llm',
  'copilot',
  '人工智能',
  '生成式ai',
  '生成式人工智能',
  '大模型',
  '機器學習',
  '机器学习',
];

const educationTerms = [
  'school',
  'student',
  'teacher',
  'classroom',
  'curriculum',
  'lesson',
  'education',
  'university',
  'college',
  'assessment',
  'course',
  'learners',
  '学校',
  '學生',
  '学生',
  '教師',
  '教师',
  '课堂',
  '課堂',
  '课程',
  '課程',
  '教育',
  '教学',
  '學習',
  '学习',
  '评估',
  '評估',
];

const practiceTerms = [
  'case',
  'pilot',
  'class',
  'lesson',
  'course',
  'project',
  'workshop',
  'implementation',
  'trial',
  'classroom',
  'activity',
  '案例',
  '实践',
  '實踐',
  '课堂',
  '課堂',
  '活动',
  '活動',
  '课程',
  '課程',
  '项目',
  '項目',
  '试点',
  '試點',
];

async function main() {
  const [casesText, feedsText] = await Promise.all([
    readFile(CASES_PATH, 'utf8'),
    readFile(FEEDS_PATH, 'utf8'),
  ]);
  const existingCases = parseCsv(casesText);
  const candidates = existsSync(CANDIDATES_PATH)
    ? parseCsv(await readFile(CANDIDATES_PATH, 'utf8'))
    : [];
  const feeds = JSON.parse(feedsText);

  const knownUrls = new Set(
    [...existingCases, ...candidates]
      .map((record) => normalizeUrl(record.source_url))
      .filter(Boolean),
  );

  const nextCandidateId = createCandidateIdFactory(candidates);
  const newCandidates = [];
  const feedReports = [];

  for (const feed of feeds) {
    try {
      const feedText = await fetchText(feed.url);
      const items = parseFeedItems(feedText);
      let matched = 0;

      for (const item of items) {
        if (newCandidates.length >= MAX_NEW_CANDIDATES) {
          break;
        }

        const sourceUrl = normalizeUrl(item.url);
        if (!sourceUrl || knownUrls.has(sourceUrl)) {
          continue;
        }

        const searchableText = `${item.title} ${item.description}`;
        if (!hasAiInTitle(item.title, feed) || !looksLikeTeachingPractice(searchableText)) {
          continue;
        }

        const record = buildCandidateRecord({
          id: nextCandidateId(),
          item,
          feed,
          sourceUrl,
        });

        knownUrls.add(sourceUrl);
        newCandidates.push(record);
        matched += 1;
      }

      feedReports.push(`- ${feed.name}: 读取 ${items.length} 条，新增 ${matched} 条候选`);
    } catch (error) {
      feedReports.push(`- ${feed.name}: 读取失败，${error.message}`);
    }
  }

  if (newCandidates.length > 0) {
    await mkdir(dirname(CANDIDATES_PATH), { recursive: true });
    await writeFile(CANDIDATES_PATH, toCsv([...candidates, ...newCandidates], CASE_FIELDS));
  }

  await writeSummary({ newCandidates, feedReports });
  console.log(`Added ${newCandidates.length} candidate case(s).`);
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'AIED Case Hub updater (https://github.com/Jojo-Edtech/aied-case-hub)',
        accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function parseFeedItems(xml) {
  const itemBlocks = [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)].map((match) => match[0]);
  const entryBlocks = [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)].map((match) => match[0]);
  const blocks = itemBlocks.length > 0 ? itemBlocks : entryBlocks;

  if (blocks.length === 0) {
    throw new Error('No RSS/Atom items found');
  }

  return blocks.map((block) => {
    const title = cleanText(readTag(block, 'title'));
    const description = cleanText(
      readTag(block, 'description') ||
        readTag(block, 'summary') ||
        readTag(block, 'content:encoded') ||
        readTag(block, 'content'),
    );
    const url = readTag(block, 'link') || readHref(block, 'link') || readTag(block, 'guid');
    const published =
      readTag(block, 'pubDate') || readTag(block, 'published') || readTag(block, 'updated');

    return {
      title,
      description,
      url: decodeEntities(url.trim()),
      publishedDate: normalizeDate(published),
    };
  });
}

function readTag(block, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escaped}\\b[^>]*>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return match?.[1] ?? '';
}

function readHref(block, tagName) {
  const escaped = tagName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = block.match(new RegExp(`<${escaped}\\b[^>]*href=["']([^"']+)["'][^>]*>`, 'i'));
  return match?.[1] ?? '';
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)));
}

function looksLikeTeachingPractice(text) {
  const normalized = text.toLowerCase();
  return (
    includesAny(normalized, aiTerms) &&
    includesAny(normalized, educationTerms) &&
    includesAny(normalized, practiceTerms) &&
    !looksLikeAiResearchOnly(normalized)
  );
}

function hasAiInTitle(title, feed) {
  return Boolean(feed.ai_focused) || includesAny(title.toLowerCase(), aiTerms);
}

function looksLikeAiResearchOnly(text) {
  return [
    /teaching ai (agents?|models?)/i,
    /training (method|ai model|machine learning model)/i,
    /test bed for ai agents?/i,
    /ai model can outperform/i,
    /researchers? (developed|trained|propose|introduce)/i,
  ].some((pattern) => pattern.test(text));
}

function includesAny(text, terms) {
  return terms.some((term) => {
    const normalizedTerm = term.toLowerCase();
    if (/^[a-z0-9]+$/.test(normalizedTerm) && normalizedTerm.length <= 3) {
      return new RegExp(`(^|[^a-z0-9])${escapeRegExp(normalizedTerm)}([^a-z0-9]|$)`).test(text);
    }
    return text.includes(normalizedTerm);
  });
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildCandidateRecord({ id, item, feed, sourceUrl }) {
  const text = `${item.title} ${item.description}`;
  const category = inferCategory(text);
  const subcategory = inferSubcategory(text, category);
  const summarySource = item.description || item.title;
  const subject = inferSubject(text, category, subcategory);

  const record = {
    id,
    title_original: item.title,
    title_cn: `待审核：${item.title}`,
    category,
    subcategory,
    subject,
    education_level: inferEducationLevel(text),
    language: feed.language || '英文',
    region: inferRegion(text, feed.region || '全球'),
    ai_tool_or_method: inferMethod(text),
    summary_cn: `自动候选：${truncate(summarySource, 140)}。请审核是否为真实教学实践案例，并补充正式简体中文摘要。`,
    workflow_cn: '',
    source_type: feed.source_type || '媒体报道',
    credibility: feed.credibility || '媒体报道',
    source_url: sourceUrl,
    published_date: item.publishedDate,
    accessed_date: todayInHongKong(),
  };
  record.workflow_cn = workflowFor(record);
  return record;
}

function inferCategory(text) {
  const lower = text.toLowerCase();
  if (/(assessment|grading|feedback|teacher|lesson plan|rubric|评估|評估|评分|評分|反馈|回饋|教师|教師)/i.test(lower)) return 'AI for Teaching & Assessment';
  if (/(math|mathematics|algebra|geometry|calculus|science|biology|chemistry|physics|laboratory|stem|coding|computer science|programming|python|scratch|code|engineering|robot|robotics|maker|数学|數學|科学|科學|物理|化学|化學|生物|编程|程式|資訊科技|信息技术|工程|机器人|機器人)/i.test(lower)) return 'AI+STEM';
  if (/(business|economics|entrepreneur|finance|marketing|social studies|civics|geography|商業|商业|经济|經濟|金融|社会|社會|公民|地理)/i.test(lower)) return 'AI+Social Sciences';
  if (/(writing|reading|language|english|literacy|history|humanities|作文|阅读|閱讀|語文|语文|语言|語言|历史|歷史|人文)/i.test(lower)) return 'AI+Humanities';
  if (/(^|[^a-z])(art|arts|design|music|media|creative|visual)([^a-z]|$)|艺术|藝術|设计|設計|音乐|音樂/i.test(lower)) return 'AI+Humanities';
  return categories[0];
}

function inferSubcategory(text, category) {
  const lower = text.toLowerCase();
  if (category === 'AI+STEM') {
    if (/(math|mathematics|algebra|geometry|calculus|数学|數學)/i.test(lower)) return 'Math';
    if (/(coding|computer science|programming|python|scratch|code|编程|程式|資訊科技|信息技术)/i.test(lower)) return 'Coding / CS';
    if (/(robot|robotics|engineering|maker|机器人|機器人|工程)/i.test(lower)) return 'Engineering / Robotics';
    if (/(science|biology|chemistry|physics|laboratory|科学|科學|物理|化学|化學|生物)/i.test(lower)) return 'Science';
    return 'Integrated STEM';
  }
  if (category === 'AI+Humanities') {
    if (/(writing|reading|language|english|literacy|作文|写作|寫作|阅读|閱讀|語文|语文|语言|語言)/i.test(lower)) return 'Language';
    if (/(^|[^a-z])(art|arts|design|music|media|creative|visual)([^a-z]|$)|艺术|藝術|设计|設計|音乐|音樂/i.test(lower)) return 'Arts & Design';
    return 'Humanities';
  }
  if (category === 'AI+Social Sciences') {
    if (/(business|economics|entrepreneur|finance|marketing|商業|商业|经济|經濟|金融)/i.test(lower)) return 'Business / Economics';
    return 'Social Studies';
  }
  if (category === 'AI for Teaching & Assessment') {
    if (/(assessment|grading|rubric|feedback|评估|評估|评分|評分|反馈|回饋)/i.test(lower)) return 'Assessment / Feedback';
    if (/(teacher|professional development|lesson plan|教师|教師|备课|備課)/i.test(lower)) return 'Teacher Workflow';
    return 'Teaching Support';
  }
  if (/(ethic|bias|responsible|安全|伦理|倫理|偏见|偏誤)/i.test(lower)) return 'Responsible AI';
  if (/(prompt|chatgpt|generative|生成式|大模型)/i.test(lower)) return 'Generative AI Literacy';
  return 'AI Literacy Basics';
}

function inferSubject(text, category, subcategory) {
  const lower = text.toLowerCase();
  if (/(writing|作文|写作|寫作)/i.test(lower)) return '写作';
  if (/(reading|阅读|閱讀)/i.test(lower)) return '阅读';
  if (/(robot|robotics|机器人|機器人)/i.test(lower)) return '机器人';
  if (/(assessment|grading|rubric|评估|評估|评分|評分)/i.test(lower)) return '评估';
  if (/(teacher|professional development|教师|教師)/i.test(lower)) return '教师专业发展';
  if (category === 'AI Literacy') return 'AI素养';
  return subcategory;
}

function workflowFor(record) {
  return [
    `【案例】${record.title_cn || record.title_original}`,
    `【适用】${record.education_level || '学生'}；方向：${record.subcategory || record.category}`,
    `【目标】用${record.ai_tool_or_method || 'AI工具'}完成一个可检查的学习任务，并让学习者说明AI帮助和人工判断。`,
    '【流程】1. 用真实问题导入；2. 教师示范提示、生成或反馈；3. 学生完成任务并记录AI对话；4. 核查事实与偏差；5. 修改作品并反思。',
    '【产出】学习作品、AI使用记录和简短反思。',
    '【评价】看任务完成度、证据质量、修改过程、AI透明度和反思深度。',
    '【注意】候选案例需人工审核来源与课堂场景后再上线。',
  ].join('\\n');
}

function inferEducationLevel(text) {
  const lower = text.toLowerCase();
  if (/(primary|elementary|小学|小學)/i.test(lower)) return '小学';
  if (/(middle school|junior|初中)/i.test(lower)) return '初中';
  if (/(high school|secondary|高中|中学|中學)/i.test(lower)) return '中学';
  if (/(university|college|higher education|大学|大學|高校)/i.test(lower)) return '大学';
  if (/(teacher|educator|教师|教師)/i.test(lower)) return '教师教育';
  return '混合';
}

function inferRegion(text, fallback) {
  if (/(hong kong|香港)/i.test(text)) return '香港';
  if (/(china|mainland|中国|中國|内地|內地)/i.test(text)) return '中国内地';
  if (/(taiwan|台湾|台灣)/i.test(text)) return '台湾';
  if (/(macau|macao|澳门|澳門)/i.test(text)) return '澳门';
  if (/(united kingdom|uk|britain|英国|英國)/i.test(text)) return '英国';
  if (/(australia|澳大利亚|澳洲)/i.test(text)) return '澳大利亚';
  if (/(canada|加拿大)/i.test(text)) return '加拿大';
  if (/(singapore|新加坡)/i.test(text)) return '新加坡';
  return fallback;
}

function inferMethod(text) {
  const lower = text.toLowerCase();
  if (/(chatgpt|chatbot|聊天机器人|聊天機器人)/i.test(lower)) return 'Chatbot';
  if (/(generative|生成式|大模型|llm|large language model)/i.test(lower)) return 'Generative AI';
  if (/(image|visual|图像|圖像|影像)/i.test(lower)) return 'Image Generation';
  if (/(robot|robotics|机器人|機器人)/i.test(lower)) return 'Robotics';
  if (/(feedback|rubric|grading|反馈|回饋|评分|評分)/i.test(lower)) return 'Writing Feedback';
  if (/(coding|programming|code|编程|程式)/i.test(lower)) return 'Coding Assistant';
  if (/(adaptive|personalized|個人化|个性化|自适应|自適應)/i.test(lower)) return 'Adaptive Learning';
  return 'Generative AI';
}

function createCandidateIdFactory(candidates) {
  let max = 0;
  for (const candidate of candidates) {
    const match = String(candidate.id).match(/^candidate-(\d+)$/);
    if (match) {
      max = Math.max(max, Number(match[1]));
    }
  }

  return () => {
    max += 1;
    return `candidate-${String(max).padStart(3, '0')}`;
  };
}

function normalizeUrl(value) {
  if (!value) return '';
  try {
    const url = new URL(value.trim());
    url.hash = '';
    for (const key of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid|gclid|mc_cid|mc_eid)/i.test(key)) {
        url.searchParams.delete(key);
      }
    }
    return url.toString();
  } catch {
    return value.trim();
  }
}

function normalizeDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value.trim().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function todayInHongKong() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Hong_Kong',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

function truncate(value, maxLength) {
  const clean = String(value).replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1)}…`;
}

async function writeSummary({ newCandidates, feedReports }) {
  const lines = [
    '# Daily AIED Candidate Update',
    '',
    `Run date: ${todayInHongKong()} HKT`,
    '',
    `New candidates: ${newCandidates.length}`,
    '',
    '## Feed report',
    '',
    ...feedReports,
    '',
  ];

  if (newCandidates.length > 0) {
    lines.push('## Review checklist', '');
    lines.push('- Confirm each source is a real classroom, course, activity, or learning task.');
    lines.push('- Replace `待审核` titles and automatic notes with polished Simplified Chinese copy.');
    lines.push('- Move approved rows from `data/candidate_cases.csv` into `data/cases.csv`.');
    lines.push('- Remove rejected candidate rows before merging.');
    lines.push('');
    lines.push('## New candidate links', '');
    for (const candidate of newCandidates) {
      lines.push(`- ${candidate.title_original}: ${candidate.source_url}`);
    }
  } else {
    lines.push('No new candidate cases matched the conservative filters.');
  }

  await mkdir(dirname(SUMMARY_PATH), { recursive: true });
  await writeFile(SUMMARY_PATH, `${lines.join('\n')}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
