import React from 'react'
import Marquee from 'react-fast-marquee'
import instagram from '@/public/svgs/instagram.svg'
import twitter from '@/public/svgs/twitter.svg'
import youtube from '@/public/svgs/youtube.svg'
import rss from '@/public/svgs/rss.svg'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-black text-white flex flex-col gap-32 pb-[4.06rem]">
      <div className="p-5">
        <Marquee className="">
          {Array.from({length: 10}).map((_, index) => (
            <p className="text-[1.375rem] text-white mr-6 uppercase font-semibold" key={index}>
              Newsletter+++
            </p>
          ))}
        </Marquee>
      </div>

      <div className="wrapper flex items-center justify-between gap-6">
        <h2 className="max-w-[49.40131rem] text-[5rem] font-semibold leading-[110%] uppercase text-white-2">
          Design News to your inbox
        </h2>

        <form action="#" className="flex items-center gap-3">
          <input
            type="email"
            placeholder="Email"
            className="max-w-[19.3125rem] min-h-[3.125rem] w-full py-2 px-[0.9375rem] bg-white placeholder:text-black text-black"
          />
          <button
            type="submit"
            className="min-h-[3.125rem] bg-white py-1 px-6 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 flex items-center justify-center text-black uppercase text-sm font-medium flex-shrink-0"
          >
            Sign Up
          </button>
        </form>
      </div>

      <FooterBottom />
    </footer>
  )
}

export default Footer

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  links: FooterLink[]
}

const FooterBottom: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      links: [
        {label: 'Art', href: '/art'},
        {label: 'Design', href: '/design'},
        {label: 'Architecture', href: '/architecture'},
      ],
    },
    {
      links: [
        {label: 'Magazine', href: '/magazine'},
        {label: 'Podcast', href: '/podcast'},
        {label: 'Authors', href: '/authors'},
      ],
    },
    {
      links: [
        {label: 'Styleguide', href: '/styleguide'},
        {label: 'Licensing', href: '/licensing'},
        {label: 'Changelog', href: '/changelog'},
      ],
    },
  ]

  const socialLinks = [
    {icon: instagram, href: 'https://instagram.com', label: 'Instagram'},
    {icon: twitter, href: 'https://x.com', label: 'X'},
    {icon: youtube, href: 'https://youtube.com', label: 'YouTube'},
    {icon: rss, href: '/rss', label: 'RSS Feed'},
  ]

  return (
    <div className="wrapper">
      {/* Brand Section */}
      <div className="flex gap-[18.75rem] w-full">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">FYRRE MAGAZINE</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 flex-3">
          {/* Navigation Links */}
          {footerSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3  columns-1 w-full">
              {section.links.map((link, linkIndex) => (
                <div key={linkIndex}>
                  <Link href={link.href} className="text-white leading-[180%] text-base">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8">
        {/* Copyright */}
        <div className="text-white leading-[160%] text-sm mb-6 md:mb-0">
          © Made by Itachi.tsx • Powered by Nextjs & Sanity
        </div>

        {/* Social Links */}
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.label}
                target="_blank"
              >
                <Image src={IconComponent} alt={social.label} />
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
