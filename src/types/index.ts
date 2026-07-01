export type ItemCategory =
  | 'produce'
  | 'dairy'
  | 'bakery'
  | 'beverages'
  | 'snacks'
  | 'household'
  | 'other';

export interface Item {
  id: string;
  name: string;
  category: ItemCategory;
  purchased: boolean;
  createdAt: number;
}

export interface CategoryMeta {
  value: ItemCategory;
  label: string;
  emoji: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { value: 'produce', label: 'Produce', emoji: '🥬' },
  { value: 'dairy', label: 'Dairy', emoji: '🥛' },
  { value: 'bakery', label: 'Bakery', emoji: '🥖' },
  { value: 'beverages', label: 'Drinks', emoji: '🥤' },
  { value: 'snacks', label: 'Snacks', emoji: '🍪' },
  { value: 'household', label: 'Home', emoji: '🧺' },
  { value: 'other', label: 'Other', emoji: '📦' },
];

export function getCategoryMeta(value: ItemCategory): CategoryMeta {
  return (
    CATEGORIES.find((c) => c.value === value) ??
    CATEGORIES[CATEGORIES.length - 1]
  );
}

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';
export type CategoryFilterValue = ItemCategory | 'all';
