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
    className={`category-btn py-2 px-3 rounded-[6.25rem] border border-black text-xs uppercase cursor-pointer transition-all hover:bg-black hover:text-white ${
      isActive ? 'active' : ''
    }`}
  >
    <span className="category-btn-content">{category}</span>
  </button>
)

export default CategoryButton