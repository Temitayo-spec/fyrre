import {
  AppleIcon,
  Instagram,
  SoundcloudIcon,
  SpotifyIcon,
  Twitter,
  Youtube,
} from '@/app/components/shared/Icons'
import podcast_1 from '@/public/images/podcast_1.png'
import podcast_2 from '@/public/images/podcast_2.png'
import podcast_3 from '@/public/images/podcast_3.png'
import podcast_4 from '@/public/images/podcast_4.png'
import podcast_5 from '@/public/images/podcast_5.png'
import arrow from '@/public/svgs/arrow.svg'
import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram'},
  {icon: <Twitter />, href: 'https://x.com', label: 'X'},
  {icon: <Youtube />, href: 'https://youtube.com', label: 'YouTube'},
]

const PodcastDetailsSection = () => {
  return (
    <section className='mb-48'>
      <div className="max-w-[75rem] w-[90%] mx-auto flex gap-24">
        <div className="max-w-[21.875rem] flex-1">
          <div className="relative max-w-[21.875rem] flex-1 mb-8">
            <Image
              src={podcast_1}
              alt="podcast"
              className="object-cover h-[21.875rem] group-hover:brightness-110 transition-all duration-300"
              quality={100}
            />

            <div className="absolute top-4 left-4">
              <h3 className="text-[2.73438rem] uppercase font-semibold text-white">Fyrre</h3>
              <p className="text-[1.36719rem] uppercase font-semibold text-white -translate-y-3 inline-flex">
                Podcast
              </p>
            </div>

            <div className="absolute bottom-[1.47rem] px-4 flex items-end justify-between w-full">
              <h4 className="text-[1.36719rem] font-semibold text-white uppercase">EP{'05'}</h4>
              <Image src={arrow} alt="arrow" className="w-[2.72669rem]" />
            </div>
          </div>

          <div className="flex items-center justify-between mb-12">
            <p className="text-xl font-semibold leading-[160%]">Listen On</p>

            <div className="flex items-center gap-4">
              <Link href="#">
                <SpotifyIcon />
              </Link>
              <Link href="#">
                <AppleIcon />
              </Link>
              <Link href="#">
                <SoundcloudIcon />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-black">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Date</p>
                <p className="text-base leading-[180%]">16. March 2022</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Read</p>
                <p className="text-base leading-[180%]">2 Min</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-base leading-[180%] font-semibold">Share</p>

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
          </div>
        </div>

        <div className="space-y-16 flex-2">
          <header className="space-y-8">
            <div className="space-y-4">
              <h4 className="text-base font-semibold uppercase">Episode 01</h4>
              <h2 className="text-[6.25rem] font-semibold leading-[100%] uppercase">
                Save the world from ourselves!
              </h2>
            </div>

            <p className="font-medium text-[1.375rem] leading-[180%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem.
              Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.
            </p>
          </header>

          <div className="flex-1 flex flex-col gap-6 text-xl leading-[180%]">
            <p>
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
            <p>
              Tellus orci ac auctor augue mauris augue neque gravida. Tempus imperdiet nulla
              malesuada pellentesque elit eget gravida cum sociis. Id eu nisl nunc mi ipsum faucibus
              vitae aliquet. Duis convallis convallis tellus id interdum velit laoreet id. Vulputate
              mi sit amet mauris commodo quis. Semper viverra nam libero justo laoreet sit amet.
              Eget nullam non nisi est sit. Nibh cras pulvinar mattis nunc sed blandit libero. Ac
              felis donec et odio pellentesque diam volutpat. Quis varius quam quisque id diam vel
              quam elementum. Felis bibendum ut tristique et egestas quis ipsum suspendisse
              ultrices. Id diam vel quam elementum pulvinar etiam non. Non consectetur a erat nam at
              lectus urna duis convallis.
            </p>

            <div className="my-6 py-12 border-t border-b border-black flex gap-6">
              <span className="text-[6rem] font-semibold leading-[100%]">“</span>
              <div className="flex flex-col gap-6">
                <div className="text-[3rem] font-semibold leading-[120%]">
                  The greatest glory in living lies not in never falling, but in rising every time
                  we fall.
                </div>
                <p className="text-sm leading-[160%]">Nelson Mandela</p>
              </div>
            </div>

            <b className="font-medium">
              Est pellentesque elit ullamcorper dignissim. Consectetur a erat nam at. Blandit libero
              volutpat sed cras ornare arcu. Iaculis urna id volutpat lacus laoreet. Tincidunt
              ornare massa eget egestas purus viverra accumsan in. Viverra ipsum nunc aliquet
              bibendum enim facilisis gravida neque.
            </b>

            <p>
              Vitae turpis massa sed elementum tempus egestas sed. Quam lacus suspendisse faucibus
              interdum posuere lorem ipsum. Viverra justo nec ultrices dui sapien eget. At risus
              viverra adipiscing at in tellus integer feugiat. Elementum eu facilisis sed odio morbi
              quis commodo. Arcu cursus vitae congue mauris rhoncus aenean. Auctor elit sed
              vulputate mi sit amet mauris commodo quis. Lectus sit amet est placerat in egestas
              erat imperdiet sed. Eu mi bibendum neque egestas congue quisque. Sit amet luctus
              venenatis lectus magna fringilla urna porttitor. Pretium vulputate sapien nec sagittis
              aliquam malesuada bibendum arcu. Sed ullamcorper morbi tincidunt ornare massa eget
              egestas purus. Pharetra vel turpis nunc eget lorem. Morbi blandit cursus risus at
              ultrices mi tempus imperdiet nulla. In metus vulputate eu scelerisque felis imperdiet.
              Elementum pulvinar etiam non quam lacus suspendisse. Sem fringilla ut morbi tincidunt
              augue. Id venenatis a condimentum vitae sapien. Varius quam quisque id diam vel.
            </p>

            <p>
              Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Aliquam nulla
              facilisi cras fermentum. Quam elementum pulvinar etiam non quam lacus suspendisse
              faucibus interdum. Neque vitae tempus quam pellentesque nec. Interdum consectetur
              libero id faucibus nisl tincidunt eget nullam. Mattis enim ut tellus elementum
              sagittis. In fermentum et sollicitudin ac orci phasellus. Est sit amet facilisis magna
              etiam tempor orci. Lacinia at quis risus sed vulputate odio ut. Egestas egestas
              fringilla phasellus faucibus scelerisque eleifend. Nunc pulvinar sapien et ligula
              ullamcorper malesuada proin libero. Aenean vel elit scelerisque mauris pellentesque.
              Gravida arcu ac tortor dignissim. Ac tortor dignissim convallis aenean.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PodcastDetailsSection
