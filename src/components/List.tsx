import { useEffect, useRef, useState } from 'react';
import { FaTrash, FaCheck, FaPencilAlt, FaSave, FaTimes } from 'react-icons/fa';
import type { Item } from '../types';
import { getCategoryMeta } from '../types';

interface ListProps {
  items: Item[];
  onTogglePurchased: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

const List = ({ items, onTogglePurchased, onDelete, onUpdate }: ListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setEditValue(item.name);
  };

  const saveEdit = (id: string) => {
    const trimmed = editValue.trim();
    if (trimmed) onUpdate(id, trimmed);
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (items.length === 0) return null;

  return (
    <ul className="list" role="list">
      {items.map((item) => {
        const meta = getCategoryMeta(item.category);
        const isEditing = editingId === item.id;
        return (
          <li
            key={item.id}
            className={`list-item ${item.purchased ? 'purchased' : ''}`}
          >
            <button
              type="button"
              className="check"
              role="checkbox"
              aria-checked={item.purchased}
              aria-label={`Mark ${item.name} as ${
                item.purchased ? 'not purchased' : 'purchased'
              }`}
              onClick={() => onTogglePurchased(item.id)}
            >
              {item.purchased && <FaCheck />}
            </button>

            <span className="cat-emoji" aria-hidden="true" title={meta.label}>
              {meta.emoji}
            </span>

            {isEditing ? (
              <>
                <input
                  ref={editInputRef}
                  type="text"
                  className="input input-inline"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      saveEdit(item.id);
                    }
                    if (e.key === 'Escape') {
                      e.preventDefault();
                      cancelEdit();
                    }
                  }}
                  aria-label={`Edit name for ${item.name}`}
                />
                <div className="actions">
                  <button
                    type="button"
                    className="btn-icon save"
                    aria-label="Save edit"
                    onClick={() => saveEdit(item.id)}
                  >
                    <FaSave />
                  </button>
                  <button
                    type="button"
                    className="btn-icon cancel"
                    aria-label="Cancel edit"
                    onClick={cancelEdit}
                  >
                    <FaTimes />
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="item-name" title={item.category}>
                  {item.name}
                </span>
                <div className="actions">
                  <button
                    type="button"
                    className="btn-icon edit"
                    aria-label={`Edit ${item.name}`}
                    onClick={() => startEdit(item)}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    type="button"
                    className="btn-icon delete"
                    aria-label={`Delete ${item.name}`}
                    onClick={() => onDelete(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default List;
