'use client'
import {useState, useMemo} from 'react'
import {magazines} from '@/constants/magazines'
import Image from 'next/image'
import Link from 'next/link'

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
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentMagazines = filteredMagazines.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string): void => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <section>
      <div className="wrapper space-y-12 pb-48">
        <header className="flex items-center justify-between">
          <h3 className="font-semibold text-base uppercase">Categories</h3>

          <div className="space-x-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`category-btn py-2 px-3 rounded-[6.25rem] border border-black text-xs uppercase cursor-pointer ${
                  activeCategory === category ? 'active' : ''
                }`}
              >
                <span className="category-btn-content">{category}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-3 relative border-[0.5px] border-black">
          {currentMagazines.map((magazine, index) => (
            <Link
              href={'/magazine/' + magazine.title.toLowerCase()}
              key={`${magazine.title}-${index}`}
              className="group"
            >
              <article className="magazine-card p-[2.5rem] border-[0.5px] border-black gap-y-8 min-h-[54rem] flex flex-col">
                <div className="magazine-card-content flex flex-col gap-y-8 h-full flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm leading-[160%]">{magazine.publishedAt}</p>

                    <div className="py-2 px-3 rounded-[6.25rem] border border-black text-xs uppercase">
                      {magazine.category}
                    </div>
                  </div>

                  <div>
                    <Image
                      src={magazine.thumbnail}
                      alt={magazine.title}
                      width={400}
                      height={300}
                      className="object-contain"
                      quality={100}
                    />
                  </div>

                  <div className="flex flex-col justify-between h-full flex-1">
                    <div className="space-y-3">
                      <h3 className="text-[2rem] font-semibold leading-[120%]">{magazine.title}</h3>
                      <p className="text-base leading-[180%]">{magazine.excerpt}</p>
                    </div>

                    <div>
                      <div className="flex gap-4">
                        <p className="flex gap-2 text-sm leading-[160%]">
                          <span className="font-semibold">Text</span>
                          {magazine.author}
                        </p>
                        <p className="flex gap-2 text-sm leading-[160%]">
                          <span className="font-semibold">Duration</span>
                          {magazine.duration} min
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {(hasPrevPage || hasNextPage) && (
          <div className="flex items-center justify-between mt-24">
            {hasPrevPage ? (
              <button
                type="button"
                onClick={handlePrevPage}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  className="rotate-180"
                >
                  <path
                    d="M12.672 7.74284L7.308 2.37884L8.722 0.964844L16.5 8.74284L8.722 16.5208L7.308 15.1068L12.672 9.74284H0.5V7.74284H12.672Z"
                    fill="black"
                  />
                </svg>
                <span className="text-base font-semibold uppercase">Previous</span>
              </button>
            ) : (
              <div />
            )}

            {hasNextPage ? (
              <button
                type="button"
                onClick={handleNextPage}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer"
              >
                <span className="text-base font-semibold uppercase">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                >
                  <path
                    d="M12.672 7.74284L7.308 2.37884L8.722 0.964844L16.5 8.74284L8.722 16.5208L7.308 15.1068L12.672 9.74284H0.5V7.74284H12.672Z"
                    fill="black"
                  />
                </svg>
              </button>
            ) : (
              <div />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default MagazineCoreSection
