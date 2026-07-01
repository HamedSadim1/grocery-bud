import type { CategoryMeta } from '../types';

interface CategoryChipProps {
  category: CategoryMeta;
  selected: boolean;
  onSelect: () => void;
}

/**
 * Reusable category chip button used by both AddForm (category picker) and
 * CategoryFilter (filter tabs). Single source of truth for chip rendering.
 */
const CategoryChip = ({ category, selected, onSelect }: CategoryChipProps) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    className={`chip ${selected ? 'active' : ''}`}
    onClick={onSelect}
  >
    <span aria-hidden="true">{category.emoji}</span>
    <span>{category.label}</span>
  </button>
);

export default CategoryChip;
