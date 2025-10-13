import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import {authors} from '@/constants/authors'
import Image from 'next/image'

const socialLinks = [
  {icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram'},
  {icon: <Twitter />, href: 'https://x.com', label: 'X'},
  {icon: <Youtube />, href: 'https://youtube.com', label: 'YouTube'},
]

const AuthorDetailsSection = () => {
  return (
    <section className="mb-[9.5rem]">
      <div className="max-w-[75rem] w-[90%] mx-auto flex gap-24">
        <div className="space-y-12 max-w-[21.875rem] flex-1">
          <div className="">
            <Image
              src={authors[0].image}
              alt="author photo"
              className="object-cover h-[21.875rem] w-[21.875rem] group-hover:brightness-110 transition-all duration-300 rounded-full"
              quality={100}
            />
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-black">
            <p className="text-xl uppercase font-semibold">Follow</p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-black transition-colors duration-200"
                  aria-label={social.label}
                  target="_blank"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-2 space-y-12">
          <div className="space-y-8">
            <h2 className="text-[6.5rem] font-semibold leading-[110%] uppercase">Louise Jensen</h2>
            <b className="font-medium text-[1.375rem] leading-[180%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem.
              Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.
            </b>
          </div>
          <p className="text-base leading-[180%]">
            Porttitor rhoncus dolor purus non enim praesent elementum. Eget dolor morbi non arcu
            risus quis varius. Posuere ac ut consequat semper viverra nam libero. In ornare quam
            viverra orci sagittis eu. Tristique risus nec feugiat in fermentum posuere urna nec.
            Tempus quam pellentesque nec nam aliquam sem et. Convallis a cras semper auctor neque
            vitae tempus quam pellentesque. Sollicitudin ac orci phasellus egestas tellus rutrum
            tellus pellentesque. Sed egestas egestas fringilla phasellus faucibus scelerisque
            eleifend donec pretium. Sit amet porttitor eget dolor morbi non arcu risus. Justo eget
            magna fermentum iaculis eu non diam phasellus. Sit amet luctus venenatis lectus magna
            fringilla. Neque vitae tempus quam pellentesque nec nam.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AuthorDetailsSection
