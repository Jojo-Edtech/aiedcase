export const CASE_FIELDS = [
  'id',
  'title_original',
  'title_cn',
  'category',
  'subcategory',
  'subject',
  'education_level',
  'language',
  'region',
  'ai_tool_or_method',
  'summary_cn',
  'workflow_cn',
  'source_type',
  'credibility',
  'source_url',
  'published_date',
  'accessed_date',
];

export const RESOURCE_FIELDS = [
  'id',
  'title_original',
  'title_cn',
  'resource_type',
  'category',
  'subject',
  'education_level',
  'audience',
  'language',
  'region',
  'publisher',
  'summary_cn',
  'use_case_cn',
  'source_url',
  'published_date',
  'accessed_date',
  'access_type',
];

export const PROMPT_FIELDS = [
  'id',
  'title_cn',
  'prompt_type',
  'category',
  'subject',
  'education_level',
  'audience',
  'output_format',
  'ai_tool_or_method',
  'prompt_cn',
  'use_case_cn',
  'source_title',
  'source_url',
  'accessed_date',
];

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && char === ',') {
      row.push(value);
      value = '';
      continue;
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      if (char === '\r' && next === '\n') {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell !== '')) {
        rows.push(row);
      }
      row = [];
      value = '';
      continue;
    }

    value += char;
  }

  if (value !== '' || row.length > 0) {
    row.push(value);
    rows.push(row);
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0];
  return rows.slice(1).map((cells) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = cells[index] ?? '';
    });
    return record;
  });
}

export function toCsv(records, fields = CASE_FIELDS) {
  const lines = [fields.map(escapeCell).join(',')];
  for (const record of records) {
    lines.push(fields.map((field) => escapeCell(record[field] ?? '')).join(','));
  }
  return `${lines.join('\n')}\n`;
}

export function escapeCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}
