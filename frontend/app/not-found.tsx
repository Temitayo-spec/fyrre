'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {ExternalLink, Play, Pause} from 'lucide-react'

export default function LinkSelector() {
  const router = useRouter()

  const links = [
    {name: 'Home', path: '/'},
    {name: 'Magazine', path: '/magazine'},
    {name: 'Authors', path: '/authors'},
    {name: 'Podcast', path: '/podcast'},
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isSpinning, setIsSpinning] = useState(true)
  const [speed, setSpeed] = useState(100)

  useEffect(() => {
    if (!isSpinning) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % links.length)
    }, speed)

    return () => clearInterval(interval)
  }, [isSpinning, speed, links.length])

  const handleChoose = () => {
    if (isSpinning) {
      setSpeed(200)
      setTimeout(() => setSpeed(300), 200)
      setTimeout(() => setSpeed(500), 400)
      setTimeout(() => {
        setIsSpinning(false)
      }, 800)
    } else {
      router.push(links[currentIndex].path)
    }
  }

  const handleReset = () => {
    setIsSpinning(true)
    setSpeed(100)
  }

  const currentLink = links[currentIndex]

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-black">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-black mb-2">404</h1>
            <p className="text-gray-600">
              {isSpinning ? 'Finding a page for you...' : 'Ready to navigate!'}
            </p>
          </div>

          <div className="relative mb-8">
            <div
              className={`bg-black rounded-2xl p-12 border-4 border-white transform transition-all duration-300 ${
                isSpinning ? 'scale-95' : 'scale-100'
              }`}
            >
              <div className="text-center">
                <ExternalLink className="w-16 h-16 text-white mx-auto mb-4 animate-pulse" />
                <h2 className="text-5xl font-bold text-white mb-2">{currentLink.name}</h2>
                <p className="text-gray-300 text-lg font-mono">{currentLink.path}</p>
              </div>
            </div>

            {isSpinning && (
              <div className="absolute -top-4 -right-4 bg-white text-black border-4 border-black rounded-full px-4 py-2 font-bold text-sm animate-bounce">
                SPINNING
              </div>
            )}
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {links.map((_, idx) => (
              <div
                key={idx}
                className={`h-3 rounded-full transition-all duration-300 border-2 border-black ${
                  idx === currentIndex ? 'w-8 bg-black' : 'w-3 bg-white'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={handleChoose}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg border-4 ${
                isSpinning
                  ? 'bg-black text-white border-black hover:bg-gray-900'
                  : 'bg-white text-black border-black hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                {isSpinning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Stop & Choose
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5" />
                    Navigate
                  </>
                )}
              </div>
            </button>

            {!isSpinning && (
              <button
                onClick={handleReset}
                className="px-8 py-4 bg-white text-black border-4 border-black hover:bg-gray-100 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Spin Again
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white rounded-2xl p-6 border-4 border-black">
          <h3 className="text-gray-600 text-sm font-semibold mb-3 uppercase tracking-wider">
            Available Destinations ({links.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {links.map((link, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 border-2 ${
                  idx === currentIndex
                    ? 'bg-black text-white border-black font-semibold scale-105'
                    : 'bg-white text-black border-gray-300'
                }`}
              >
                {link.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
