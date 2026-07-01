import type { CategoryFilterValue } from '../types';
import { CATEGORIES } from '../types';
import CategoryChip from './CategoryChip';

interface CategoryFilterProps {
  active: CategoryFilterValue;
  setActive: (value: CategoryFilterValue) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const CategoryFilter = ({
  active,
  setActive,
  searchQuery,
  setSearchQuery,
}: CategoryFilterProps) => {
  return (
    <div className="filters">
      <div className="search-wrap">
        <input
          type="search"
          className="input input-search"
          placeholder="Search items…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search items"
        />
      </div>

      <div
        className="chip-row"
        role="radiogroup"
        aria-label="Filter by category"
      >
        <button
          type="button"
          role="radio"
          aria-checked={active === 'all'}
          className={`chip ${active === 'all' ? 'active' : ''}`}
          onClick={() => setActive('all')}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <CategoryChip
            key={c.value}
            category={c}
            selected={active === c.value}
            onSelect={() => setActive(c.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
