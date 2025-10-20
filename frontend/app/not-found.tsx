'use client'

import {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {ExternalLink, Play, Pause} from 'lucide-react'
import {motion, AnimatePresence} from 'framer-motion'
import Confetti from 'react-confetti'

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
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({width: 0, height: 0})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize({width: window.innerWidth, height: window.innerHeight})
    }
  }, [])

  useEffect(() => {
    if (!isSpinning) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % links.length)
    }, speed)
    return () => clearInterval(interval)
  }, [isSpinning, speed, links.length])

  const handleChoose = () => {
    if (isSpinning) {
      playSound('/sounds/spin.mp3')
      setSpeed(150)
      setTimeout(() => setSpeed(250), 200)
      setTimeout(() => setSpeed(400), 400)
      setTimeout(() => {
        setIsSpinning(false)
        setShowConfetti(true)
        playSound('/sounds/ding.mp3')
        setTimeout(() => setShowConfetti(false), 2500)
      }, 1000)
    } else {
      router.push(links[currentIndex].path)
    }
  }

  const handleReset = () => {
    setIsSpinning(true)
    setSpeed(100)
  }

  const playSound = (src: string) => {
    const audio = new Audio(src)
    audio.volume = 0.2
    audio.play().catch(() => {})
  }

  const currentLink = links[currentIndex]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800  text-white overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={120}
          recycle={false}
        />
      )}

      <div className="wrapper max-w-2xl space-y-6">
        <motion.div
          animate={
            isSpinning
              ? {
                  scale: [1, 0.98, 1],
                  rotate: [0, 3, -3, 0],
                  filter: ['blur(0px)', 'blur(1px)', 'blur(0px)'],
                }
              : {scale: 1, rotate: 0, filter: 'blur(0px)'}
          }
          transition={{
            repeat: isSpinning ? Infinity : 0,
            duration: 0.6,
            ease: 'easeInOut',
          }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] p-6 sm:p-8 md:p-10 relative"
        >
          <div className="text-center mb-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-2 text-white drop-shadow-lg">
              404
            </h1>
            <p className="text-gray-300 text-base sm:text-lg font-light">
              {isSpinning ? 'Finding a page for you...' : 'Got one! Ready to jump?'}
            </p>
          </div>

          <div className="relative py-8 sm:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLink.name}
                initial={{opacity: 0, y: 25, scale: 0.9}}
                animate={{opacity: 1, y: 0, scale: 1}}
                exit={{opacity: 0, y: -25, scale: 0.9}}
                transition={{duration: 0.3}}
                className="text-center"
              >
                <motion.div
                  animate={
                    isSpinning
                      ? {scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7]}
                      : {scale: 1, opacity: 1}
                  }
                  transition={{duration: 0.4, repeat: isSpinning ? Infinity : 0}}
                >
                  <ExternalLink className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-white animate-pulse" />
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
                    {currentLink.name}
                  </h2>
                  <p className="text-gray-400 font-mono text-sm sm:text-base">{currentLink.path}</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {isSpinning && (
              <motion.div
                initial={{opacity: 0, y: -10}}
                animate={{opacity: 1, y: 0}}
                className="absolute -top-4 right-3 sm:-top-5 sm:right-5 bg-white text-black border-2 border-black rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-semibold shadow-md"
              >
                SPINNING
              </motion.div>
            )}
          </div>

          <div className="flex justify-center gap-2 mb-6">
            {links.map((_, idx) => (
              <motion.div
                key={idx}
                layout
                className={`h-2 sm:h-3 rounded-full border-2 transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-6 sm:w-8 bg-white border-white'
                    : 'w-2 sm:w-3 bg-transparent border-white/40'
                }`}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <motion.button
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={handleChoose}
              className={`flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg border-2 transition-all duration-300 ${
                isSpinning
                  ? 'bg-gradient-to-r from-black to-gray-800 text-white border-white/30'
                  : 'bg-white text-black border-black hover:bg-gray-100'
              }`}
            >
              {isSpinning ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              {isSpinning ? 'Stop & Choose' : 'Navigate'}
            </motion.button>

            {!isSpinning && (
              <motion.button
                whileHover={{rotate: 5, scale: 1.05}}
                whileTap={{scale: 0.95}}
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg border-2 bg-white text-black hover:bg-gray-100 border-black"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                Spin Again
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6">
          <h3 className="text-gray-400 text-xs sm:text-sm font-semibold mb-3 uppercase tracking-wider">
            Available Destinations ({links.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {links.map((link, idx) => (
              <motion.div
                key={idx}
                whileHover={{scale: 1.05}}
                className={`px-2 sm:px-3 py-2 rounded-lg text-center border-2 transition-all duration-300 text-sm sm:text-base ${
                  idx === currentIndex
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-transparent text-white border-white/30 hover:border-white/60'
                }`}
              >
                {link.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
