import { readFile, writeFile } from 'node:fs/promises';
import { CASE_FIELDS, PROMPT_FIELDS, RESOURCE_FIELDS, parseCsv, toCsv } from './csv-utils.mjs';

const targetDate =
  process.env.TARGET_DATE ||
  formatHongKongDate(new Date());

const datasets = [
  { path: 'data/cases.csv', fields: CASE_FIELDS },
  { path: 'data/resources.csv', fields: RESOURCE_FIELDS },
  { path: 'data/prompts.csv', fields: PROMPT_FIELDS },
];

for (const dataset of datasets) {
  const rows = parseCsv(await readFile(dataset.path, 'utf8'));
  const refreshedRows = rows.map((row) => ({
    ...row,
    accessed_date: targetDate,
  }));

  await writeFile(dataset.path, toCsv(refreshedRows, dataset.fields));
  console.log(`${dataset.path}: refreshed ${refreshedRows.length} row(s) to ${targetDate}.`);
}

function formatHongKongDate(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en', {
      timeZone: 'Asia/Hong_Kong',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}`;
}
