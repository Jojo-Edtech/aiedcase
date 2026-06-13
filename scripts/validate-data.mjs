import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { CASE_FIELDS, RESOURCE_FIELDS, parseCsv } from './csv-utils.mjs';

const files = ['data/cases.csv', 'data/candidate_cases.csv'];
const categories = new Set([
  'AI Literacy',
  'AI+STEM',
  'AI+Humanities',
  'AI+Social Sciences',
  'AI for Teaching & Assessment',
]);
const credibilityLabels = new Set(['官方/学校', '论文/研究', '教师实践', '媒体报道']);
const resourceTypes = new Set([
  '课程/教材',
  '教师指南',
  '政策框架',
  '课堂工具包',
  '学生课程',
  '资源目录',
  '研究报告',
]);
const accessTypes = new Set(['免费', '需注册', '付费/订阅', '未知']);

let failures = 0;

async function readCsvFile(file, fields) {
  if (!existsSync(file)) {
    console.error(`${file} does not exist.`);
    failures += 1;
    return [];
  }

  const text = await readFile(file, 'utf8');
  const header = text.split(/\r?\n/, 1)[0].split(',').map((cell) => cell.replace(/^"|"$/g, ''));
  const records = parseCsv(text);

  if (header.join('|') !== fields.join('|')) {
    console.error(`${file} has an unexpected header.`);
    failures += 1;
  }

  return records;
}

for (const file of files) {
  const records = await readCsvFile(file, CASE_FIELDS);
  let duplicateUrlCount = 0;
  const ids = new Set();
  const urls = new Set();

  records.forEach((record, index) => {
    const label = `${file} row ${index + 2}`;
    const missing = CASE_FIELDS.filter((field) => !record[field]);
    if (missing.length > 0) {
      console.error(`${label} is missing: ${missing.join(', ')}`);
      failures += 1;
    }

    if (ids.has(record.id)) {
      console.error(`${label} duplicates id ${record.id}.`);
      failures += 1;
    }
    ids.add(record.id);

    if (urls.has(record.source_url)) {
      duplicateUrlCount += 1;
    }
    urls.add(record.source_url);

    if (record.category && !categories.has(record.category)) {
      console.error(`${label} has unsupported category ${record.category}.`);
      failures += 1;
    }

    if (record.credibility && !credibilityLabels.has(record.credibility)) {
      console.error(`${label} has unsupported credibility ${record.credibility}.`);
      failures += 1;
    }

    if (record.source_url && !/^https?:\/\//.test(record.source_url)) {
      console.error(`${label} has invalid source_url ${record.source_url}.`);
      failures += 1;
    }
  });

  const duplicateSummary =
    duplicateUrlCount > 0 ? `, ${duplicateUrlCount} reused source URL(s)` : '';
  console.log(`${file}: ${records.length} row(s) validated${duplicateSummary}.`);
}

{
  const file = 'data/resources.csv';
  const records = await readCsvFile(file, RESOURCE_FIELDS);
  let duplicateUrlCount = 0;
  const ids = new Set();
  const urls = new Set();

  records.forEach((record, index) => {
    const label = `${file} row ${index + 2}`;
    const missing = RESOURCE_FIELDS.filter((field) => !record[field]);
    if (missing.length > 0) {
      console.error(`${label} is missing: ${missing.join(', ')}`);
      failures += 1;
    }

    if (ids.has(record.id)) {
      console.error(`${label} duplicates id ${record.id}.`);
      failures += 1;
    }
    ids.add(record.id);

    if (urls.has(record.source_url)) {
      duplicateUrlCount += 1;
    }
    urls.add(record.source_url);

    if (record.category && !categories.has(record.category)) {
      console.error(`${label} has unsupported category ${record.category}.`);
      failures += 1;
    }

    if (record.resource_type && !resourceTypes.has(record.resource_type)) {
      console.error(`${label} has unsupported resource_type ${record.resource_type}.`);
      failures += 1;
    }

    if (record.access_type && !accessTypes.has(record.access_type)) {
      console.error(`${label} has unsupported access_type ${record.access_type}.`);
      failures += 1;
    }

    if (record.source_url && !/^https?:\/\//.test(record.source_url)) {
      console.error(`${label} has invalid source_url ${record.source_url}.`);
      failures += 1;
    }
  });

  const duplicateSummary =
    duplicateUrlCount > 0 ? `, ${duplicateUrlCount} reused source URL(s)` : '';
  console.log(`${file}: ${records.length} row(s) validated${duplicateSummary}.`);
}

if (failures > 0) {
  console.error(`${failures} validation failure(s).`);
  process.exitCode = 1;
}
