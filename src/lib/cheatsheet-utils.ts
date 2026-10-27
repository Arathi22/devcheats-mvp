import type { CheatSheet } from '@/data/cheatsheets';

export function getSectionId(sheetSlug: string, sectionIndex: number) {
  return `section-${sheetSlug}-${sectionIndex + 1}`;
}

export function getEstimatedReadingMinutes(sheet: CheatSheet) {
  const content = [sheet.title, sheet.description, ...sheet.snippets.flatMap(({ title, description, code }) => [title, description, code])].join(' ');
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function getRelatedCheatSheets(sheet: CheatSheet, sheets: CheatSheet[], limit = 4) {
  const seen = new Set<string>([sheet.slug]);
  return sheets
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .map((item, index) => ({
      item,
      index,
      score: (item.category === sheet.category ? 2 : 0) + item.tags.filter((tag) => sheet.tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ item }) => item);
}
