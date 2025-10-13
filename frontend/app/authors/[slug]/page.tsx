import {ArticlesByAuthor, AuthorDetailsSection} from '@/app/components'
import Link from 'next/link'

const Page = () => {
  return (
    <main>
      <div className="flex items-center justify-between pt-8 mb-24 wrapper">
        <Link href="/authors" className="inline-flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M7.828 13.5L13.192 18.864L11.778 20.278L4 12.5L11.778 4.72202L13.192 6.13601L7.828 11.5L20 11.5V13.5L7.828 13.5Z"
              fill="black"
            />
          </svg>
          <span className="text-base font-semibold uppercase">Go Back</span>
        </Link>

        <h3 className="text-[2rem] font-semibold leading-[110%] uppercase">Author</h3>
      </div>
      <AuthorDetailsSection />
      <ArticlesByAuthor />
    </main>
  )
}

export default Page
