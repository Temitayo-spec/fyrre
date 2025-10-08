import {Instagram, Twitter, Youtube} from '@/app/components/shared/Icons'
import author from '@/public/images/author_1.png'
import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {icon: <Instagram />, href: 'https://instagram.com', label: 'Instagram'},
  {icon: <Twitter />, href: 'https://x.com', label: 'X'},
  {icon: <Youtube />, href: 'https://youtube.com', label: 'YouTube'},
]

const MagazineDetailsCoreSection = () => {
  return (
    <section className="relative">
      <div className="max-w-[65rem] w-full mx-auto flex gap-16 pt-24 pb-48 ">
        <div className="flex-1 max-w-[20rem] flex flex-col">
          <div className="pb-8 border-b border-black mb-8 flex items-center gap-4">
            <div>
              <Image
                src={author}
                alt="author"
                className="w-[5rem] h-[5rem] object-cover rounded-full"
              />
            </div>
            <h3 className="text-[2rem] leading-[120%] max-w-[14.3125rem] font-semibold">
              Jakob Gronberg
            </h3>
          </div>

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
        <div className="flex-1 flex flex-col gap-6 text-xl leading-[180%]">
          <b className="font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Egestas dui id ornare arcu odio ut sem.
            Cras ornare arcu dui vivamus arcu felis bibendum ut. Porttitor leo a diam.
          </b>
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
            Tellus orci ac auctor augue mauris augue neque gravida. Tempus imperdiet nulla malesuada
            pellentesque elit eget gravida cum sociis. Id eu nisl nunc mi ipsum faucibus vitae
            aliquet. Duis convallis convallis tellus id interdum velit laoreet id. Vulputate mi sit
            amet mauris commodo quis. Semper viverra nam libero justo laoreet sit amet. Eget nullam
            non nisi est sit. Nibh cras pulvinar mattis nunc sed blandit libero. Ac felis donec et
            odio pellentesque diam volutpat. Quis varius quam quisque id diam vel quam elementum.
            Felis bibendum ut tristique et egestas quis ipsum suspendisse ultrices. Id diam vel quam
            elementum pulvinar etiam non. Non consectetur a erat nam at lectus urna duis convallis.
          </p>

          <div className="my-6 py-12 border-t border-b border-black flex gap-6">
            <span className="text-[6rem] font-semibold leading-[100%]">“</span>
            <div className="flex flex-col gap-6">
              <div className="text-[3rem] font-semibold leading-[120%]">
                The greatest glory in living lies not in never falling, but in rising every time we
                fall.
              </div>
              <p className="text-sm leading-[160%]">Nelson Mandela</p>
            </div>
          </div>

          <b className="font-medium">
            Est pellentesque elit ullamcorper dignissim. Consectetur a erat nam at. Blandit libero
            volutpat sed cras ornare arcu. Iaculis urna id volutpat lacus laoreet. Tincidunt ornare
            massa eget egestas purus viverra accumsan in. Viverra ipsum nunc aliquet bibendum enim
            facilisis gravida neque.
          </b>

          <p>
            Vitae turpis massa sed elementum tempus egestas sed. Quam lacus suspendisse faucibus
            interdum posuere lorem ipsum. Viverra justo nec ultrices dui sapien eget. At risus
            viverra adipiscing at in tellus integer feugiat. Elementum eu facilisis sed odio morbi
            quis commodo. Arcu cursus vitae congue mauris rhoncus aenean. Auctor elit sed vulputate
            mi sit amet mauris commodo quis. Lectus sit amet est placerat in egestas erat imperdiet
            sed. Eu mi bibendum neque egestas congue quisque. Sit amet luctus venenatis lectus magna
            fringilla urna porttitor. Pretium vulputate sapien nec sagittis aliquam malesuada
            bibendum arcu. Sed ullamcorper morbi tincidunt ornare massa eget egestas purus. Pharetra
            vel turpis nunc eget lorem. Morbi blandit cursus risus at ultrices mi tempus imperdiet
            nulla. In metus vulputate eu scelerisque felis imperdiet. Elementum pulvinar etiam non
            quam lacus suspendisse. Sem fringilla ut morbi tincidunt augue. Id venenatis a
            condimentum vitae sapien. Varius quam quisque id diam vel.
          </p>

          <p>
            Nec feugiat in fermentum posuere urna nec tincidunt praesent semper. Aliquam nulla
            facilisi cras fermentum. Quam elementum pulvinar etiam non quam lacus suspendisse
            faucibus interdum. Neque vitae tempus quam pellentesque nec. Interdum consectetur libero
            id faucibus nisl tincidunt eget nullam. Mattis enim ut tellus elementum sagittis. In
            fermentum et sollicitudin ac orci phasellus. Est sit amet facilisis magna etiam tempor
            orci. Lacinia at quis risus sed vulputate odio ut. Egestas egestas fringilla phasellus
            faucibus scelerisque eleifend. Nunc pulvinar sapien et ligula ullamcorper malesuada
            proin libero. Aenean vel elit scelerisque mauris pellentesque. Gravida arcu ac tortor
            dignissim. Ac tortor dignissim convallis aenean.
          </p>
        </div>
      </div>
    </section>
  )
}

export default MagazineDetailsCoreSection
