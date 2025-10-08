const ArrowIcon = ({className = ''}: {className?: string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    className={className}
  >
    <path
      d="M12.672 7.74284L7.308 2.37884L8.722 0.964844L16.5 8.74284L8.722 16.5208L7.308 15.1068L12.672 9.74284H0.5V7.74284H12.672Z"
      fill="currentColor"
    />
  </svg>
)

const PaginationButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}) => {
  if (disabled) return <div />

  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 hover:opacity-70 transition-opacity"
      aria-label={isPrev ? 'Previous page' : 'Next page'}
    >
      {isPrev && <ArrowIcon className="rotate-180" />}
      <span className="text-base font-semibold uppercase">{isPrev ? 'Previous' : 'Next'}</span>
      {!isPrev && <ArrowIcon />}
    </button>
  )
}

export default PaginationButton