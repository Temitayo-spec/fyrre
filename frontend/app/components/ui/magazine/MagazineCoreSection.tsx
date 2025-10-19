'use client'
import {useState, useMemo, FC} from 'react'
import {motion, AnimatePresence, Variants} from 'framer-motion'
import MagazineCard from './MagazineCard'
import PaginationButton from './PaginationButton'
import CategoryButton from './CategoryButton'
import {MagazineQueryResult} from '@/sanity.types'

const ITEMS_PER_PAGE = 6

const headerContainerVariants: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const headerVariants: Variants = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const categoryContainerVariants: Variants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
}

const categoryVariants: Variants = {
  hidden: {opacity: 0, y: 20, scale: 0.9},
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

const gridContainerVariants: Variants = {
  hidden: {opacity: 1},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: string) => ({
    opacity: 0,
    x: direction === 'next' ? -30 : direction === 'prev' ? 30 : 0,
    y: direction === 'category' ? -30 : 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

const paginationVariants: Variants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const MagazineCoreSection: FC<{magazines: MagazineQueryResult}> = ({magazines}) => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [exitDirection, setExitDirection] = useState<string>('next')

  const categories = useMemo(() => {
    const cats = new Set(magazines.map((mag) => mag?.category))
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
    setExitDirection('category')
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (direction: 'prev' | 'next') => {
    setExitDirection(direction)
    setCurrentPage((prev) =>
      direction === 'prev' ? Math.max(1, prev - 1) : Math.min(totalPages, prev + 1),
    )
  }

  const hasPrevPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <section aria-label="Magazine archive">
      <div className="wrapper space-y-12 pb-48">
        <motion.header
          className="flex items-center justify-between flex-wrap gap-4"
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{once: true, amount: 0.3}}
        >
          <motion.h3 className="font-semibold text-base uppercase" variants={headerVariants}>
            Categories
          </motion.h3>
          <motion.nav
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Magazine categories"
            variants={categoryContainerVariants}
          >
            {categories.map((category) => (
              <motion.div key={category} variants={categoryVariants}>
                <CategoryButton
                  category={category}
                  isActive={activeCategory === category}
                  onClick={() => handleCategoryChange(category)}
                />
              </motion.div>
            ))}
          </motion.nav>
        </motion.header>

        <AnimatePresence mode="wait" custom={exitDirection}>
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative border-[0.5px] border-black"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {currentMagazines.length > 0 ? (
              currentMagazines.map((magazine, index) => (
                <motion.div
                  key={`${magazine.title}-${index}`}
                  variants={cardVariants}
                  custom={exitDirection}
                >
                  <MagazineCard magazine={magazine as MagazineQueryResult[0]} />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="col-span-full p-12 text-center"
              >
                <p className="text-lg">No magazines found in this category.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {(hasPrevPage || hasNextPage) && (
          <motion.nav
            className="flex items-center justify-between mt-24"
            aria-label="Pagination"
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            <motion.div variants={paginationVariants}>
              <PaginationButton
                direction="prev"
                onClick={() => handlePageChange('prev')}
                disabled={!hasPrevPage}
              />
            </motion.div>
            <motion.div variants={paginationVariants}>
              <PaginationButton
                direction="next"
                onClick={() => handlePageChange('next')}
                disabled={!hasNextPage}
              />
            </motion.div>
          </motion.nav>
        )}
      </div>
    </section>
  )
}

export default MagazineCoreSection
