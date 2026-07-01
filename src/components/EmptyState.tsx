interface EmptyStateProps {
  hasItems: boolean;
  hasFilter: boolean;
  onClearFilters?: () => void;
}

const EmptyState = ({
  hasItems,
  hasFilter,
  onClearFilters,
}: EmptyStateProps) => {
  if (!hasItems) {
    return (
      <div className="empty-state">
        <div className="empty-emoji" aria-hidden="true">
          🛒
        </div>
        <h2 className="empty-title">Your list is empty</h2>
        <p className="empty-text">Add your first item above to get started.</p>
      </div>
    );
  }

  if (hasFilter) {
    return (
      <div className="empty-state">
        <div className="empty-emoji" aria-hidden="true">
          🔍
        </div>
        <h2 className="empty-title">No items match</h2>
        <p className="empty-text">Try a different search or category.</p>
        {onClearFilters && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default EmptyState;
