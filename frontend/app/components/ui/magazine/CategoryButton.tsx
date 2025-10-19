const CategoryButton = ({
  category,
  isActive,
  onClick,
}: {
  category: string
  isActive: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`category-btn py-2 px-3 rounded-[6.25rem] border border-black text-xs uppercase cursor-pointer transition-all ${
      isActive ? 'active' : ''
    }`}
    style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'white',
    }}
  >
    <span
      className="category-btn-content"
      style={{
        position: 'relative',
        zIndex: 1,
      }}
    >
      {category}
    </span>
  </button>
)

export default CategoryButton
