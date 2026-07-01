import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import type { ItemCategory } from '../types';
import { CATEGORIES } from '../types';
import CategoryChip from './CategoryChip';

interface AddFormProps {
  defaultCategory?: ItemCategory;
  onAdd: (name: string, category: ItemCategory) => void;
}

const AddForm = ({ defaultCategory = 'produce', onAdd }: AddFormProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>(defaultCategory);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd(trimmed, category);
    setName('');
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="add-form-row">
        <input
          type="text"
          className="input input-main"
          placeholder="Add an item…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="New item name"
        />
        <button type="submit" className="btn btn-primary" aria-label="Add item">
          <FaPlus />
          <span className="btn-text">Add</span>
        </button>
      </div>

      <div
        className="add-form-cats"
        role="radiogroup"
        aria-label="Pick a category"
      >
        {CATEGORIES.map((c) => (
          <CategoryChip
            key={c.value}
            category={c}
            selected={category === c.value}
            onSelect={() => setCategory(c.value)}
          />
        ))}
      </div>
    </form>
  );
};

export default AddForm;
