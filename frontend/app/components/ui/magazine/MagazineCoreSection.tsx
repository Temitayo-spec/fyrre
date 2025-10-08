'use client'
import {useState, useMemo} from 'react'
import {magazines} from '@/constants/magazines'
import MagazineCard from './MagazineCard'
import PaginationButton from './PaginationButton'
import CategoryButton from './CategoryButton'

const ITEMS_PER_PAGE = 6

const MagazineCoreSection = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => {
    const cats = new Set(magazines.map((mag) => mag.category))
    return ['All', ...Array.from(cats)]
  }, [])

  const filteredMagazines = useMemo(() => {
    if (activeCategory === 'All') return magazines
    return magazines.filter((mag) => mag.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.ceil(filteredMagazines.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentMagazines = filteredMagazines.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (direction: 'prev' | 'next') => {
    setCurrentPage((prev) =>
      direction === 'prev' ? Math.max(1, prev - 1) : Math.min(totalPages, prev + 1),
    )
  }

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <section aria-label="Magazine archive">
      <div className="wrapper space-y-12 pb-48">
        <header className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="font-semibold text-base uppercase">Categories</h3>
          <nav className="flex flex-wrap gap-3" role="tablist" aria-label="Magazine categories">
            {categories.map((category) => (
              <CategoryButton
                key={category}
                category={category}
                isActive={activeCategory === category}
                onClick={() => handleCategoryChange(category)}
              />
            ))}
          </nav>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-[0.5px] border-black">
          {currentMagazines.length > 0 ? (
            currentMagazines.map((magazine, index) => (
              <MagazineCard key={`${magazine.title}-${index}`} magazine={magazine} />
            ))
          ) : (
            <div className="col-span-full p-12 text-center">
              <p className="text-lg">No magazines found in this category.</p>
            </div>
          )}
        </div>

        {(hasPrevPage || hasNextPage) && (
          <nav className="flex items-center justify-between mt-24" aria-label="Pagination">
            <PaginationButton
              direction="prev"
              onClick={() => handlePageChange('prev')}
              disabled={!hasPrevPage}
            />
            <PaginationButton
              direction="next"
              onClick={() => handlePageChange('next')}
              disabled={!hasNextPage}
            />
          </nav>
        )}
      </div>
    </section>
  )
}

export default MagazineCoreSection
