import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import type { ItemCategory } from '../types';
import { CATEGORIES } from '../types';

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
          <button
            key={c.value}
            type="button"
            role="radio"
            aria-checked={category === c.value}
            className={`chip chip-${c.value} ${category === c.value ? 'active' : ''}`}
            onClick={() => setCategory(c.value)}
          >
            <span aria-hidden="true">{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
    </form>
  );
};

export default AddForm;
