import { FaEdit, FaTrash } from "react-icons/fa";
import { ILIST } from "../types";

interface ListProps {
  items: ILIST[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
}

/**
 * Renders a list of items.
 *
 * @param {ListProps} props - The component props.
 * @param {Array<Item>} props.items - The array of items to render.
 * @param {Function} props.handleDelete - The function to handle item deletion.
 * @param {Function} props.handleEdit - The function to handle item editing.
 * @returns {JSX.Element} The rendered list component.
 */
const List = ({ items, handleDelete, handleEdit }: ListProps) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, name } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{name}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => handleEdit(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => handleDelete(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
