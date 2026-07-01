import { useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Item, ItemCategory } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useDarkMode } from './hooks/useDarkMode';
import Header from './components/Header';
import AddForm from './components/AddForm';
import CategoryFilter from './components/CategoryFilter';
import type { CategoryFilterValue } from './types';
import List from './components/List';
import EmptyState from './components/EmptyState';

/**
 * Top-level Grocery Bud shell.
 * - Persists the items list and theme preference to localStorage.
 * - Provides add / edit / delete / purchase-toggle / clear flows.
 * - Filters by name (search) and category chip.
 */
function App() {
  const [items, setItems] = useLocalStorage<Item[]>('grocery-bud:v2', []);
  const { preference, setPreference, resolved } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilterValue>('all');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items
      .filter(
        (item) => activeCategory === 'all' || item.category === activeCategory,
      )
      .filter((item) => q === '' || item.name.toLowerCase().includes(q))
      .sort((a, b) =>
        a.purchased === b.purchased
          ? a.createdAt - b.createdAt
          : a.purchased
            ? 1
            : -1,
      );
  }, [items, searchQuery, activeCategory]);

  const remaining = useMemo(
    () => items.filter((i) => !i.purchased).length,
    [items],
  );

  const toastBase = {
    theme: resolved,
    position: 'bottom-right' as const,
    autoClose: 1800,
  };

  const handleAdd = (name: string, category: ItemCategory) => {
    const newItem: Item = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      category,
      purchased: false,
      createdAt: Date.now(),
    };
    setItems((prev) => [...prev, newItem]);
    toast.success(`Added “${name}”`, toastBase);
  };

  const handleTogglePurchased = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, purchased: !it.purchased } : it,
      ),
    );
  };

  const handleUpdate = (id: string, name: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, name } : it)));
    toast.info(`Updated to “${name}”`, toastBase);
  };

  const handleDelete = (id: string) => {
    const item = items.find((it) => it.id === id);
    setItems((prev) => prev.filter((it) => it.id !== id));
    if (item) toast(`Removed “${item.name}”`, toastBase);
  };

  const handleClearPurchased = () => {
    const count = items.filter((i) => i.purchased).length;
    if (count === 0) return;
    setItems((prev) => prev.filter((it) => !it.purchased));
    toast(
      `Cleared ${count} completed item${count === 1 ? '' : 's'}`,
      toastBase,
    );
  };

  const handleClearAll = () => {
    if (items.length === 0) return;
    setItems([]);
    toast.error('List cleared', toastBase);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
  };

  const hasFilter = searchQuery.trim() !== '' || activeCategory !== 'all';
  const hasPurchased = items.some((i) => i.purchased);

  return (
    <>
      <ToastContainer {...toastBase} hideProgressBar />
      <div className="app-shell">
        <div className="card">
          <Header
            preference={preference}
            setPreference={setPreference}
            remaining={remaining}
            total={items.length}
          />

          <AddForm onAdd={handleAdd} />

          {items.length > 0 && (
            <CategoryFilter
              active={activeCategory}
              setActive={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          <List
            items={filtered}
            onTogglePurchased={handleTogglePurchased}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />

          <EmptyState
            hasItems={items.length > 0}
            hasFilter={hasFilter}
            onClearFilters={hasFilter ? clearFilters : undefined}
          />

          {items.length > 0 && (
            <div className="footer-actions">
              {hasPurchased && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleClearPurchased}
                >
                  Clear completed
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger-ghost"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
