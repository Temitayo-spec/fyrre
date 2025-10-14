export function cn(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(' ')
}
export const cls = (input: string) =>
  input
    .replace(/\s+/gm, ' ')
    .split(' ')
    .filter((cond) => typeof cond === 'string')
    .join(' ')
    .trim()

export const getSectionByType = <T = any>(sections: any[], targetType: string): T | undefined => {
  return sections?.find((section) => section._type === targetType)
}

export const getSectionsByType = <T = any>(sections: any[], targetType: string): T[] => {
  return sections?.filter((section) => section._type === targetType) || []
}

export function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const newArr = arr.slice()
  const val = newArr.splice(from, 1)[0]
  newArr.splice(to, 0, val)
  return newArr
}
export function parseNumber(str: string) {
  str = str.replace(/[\u200B-\u200D\uFEFF\u2060\u00A0]/g, '').trim()

  const match = str.match(/^([$])?([\d,.]+)([MBK]?)$/i)
  if (!match) return {num: 0, prefix: '', suffix: ''}

  const [, prefix, number, suffix] = match
  let num = parseFloat(number.replace(/,/g, ''))
  let multiplier = 1

  return {
    num: num * multiplier,
    prefix: prefix || '',
    suffix: suffix ? suffix.toUpperCase() : '',
    display: `${prefix || ''}${number}${suffix || ''}`,
  }
}

/**
 * Replace the alpha value in an rgba() color string.
 * @param color The original rgba color string.
 * @param newAlpha The new alpha value (0-1).
 * @returns The rgba color string with the new alpha.
 */
// Helper function to convert any CSS color to rgba format
function colorToRgba(color: string): string {
  if (typeof window === 'undefined') {
    return 'rgba(0, 0, 0, 1)' // Fallback for server-side rendering
  }

  const div = document.createElement('div')
  div.style.color = color
  document.body.appendChild(div)

  // Get the computed color (always returns rgb/rgba format)
  const computedColor = window.getComputedStyle(div).color
  document.body.removeChild(div)

  // If it's already rgba, return as is
  if (/rgba\(/i.test(computedColor)) {
    return computedColor
  }

  // If it's rgb, convert to rgba with alpha 1
  if (/rgb\(/i.test(computedColor)) {
    return computedColor.replace(/rgb\(([^)]+)\)/, 'rgba($1, 1)')
  }

  // Fallback to rgba(0,0,0,1) if parsing fails
  return 'rgba(0, 0, 0, 1)'
}

export function setRgbaAlpha(color: string, newAlpha: number): string {
  // First convert any color format to rgba
  const rgbaColor = colorToRgba(color)

  // Now set the alpha on the rgba color
  return rgbaColor.replace(
    /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/i,
    (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${newAlpha})`,
  )
}

export const truncate = (text: string, maxLength: number) => {
  return text?.length > maxLength ? text.slice(0, maxLength) + '...' : text
}

export const formatDate = (dateString: string): string => {
  if (!dateString) return ''

  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = date.toLocaleString('en-US', {month: 'long'})
  const year = date.getFullYear()

  return `${day}. ${month} ${year}`
}

// i want a function that takes a string and returns an array of strings that are the length of the string divided by the maxLength
export const breakString = (text: string, numberOfLines: number): string[] => {
  if (!text) return []

  const words = text.split(' ')
  const totalWords = words.length

  if (numberOfLines >= totalWords) {
    // If we want more lines than words, return each word as a line
    return words
  }

  const wordsPerLine = Math.ceil(totalWords / numberOfLines)
  const chunks: string[] = []

  for (let i = 0; i < numberOfLines; i++) {
    const start = i * wordsPerLine
    const end = Math.min(start + wordsPerLine, totalWords)

    if (start < totalWords) {
      chunks.push(words.slice(start, end).join(' '))
    }
  }

  return chunks
}
export const isSafariOrMobile = () => {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent.toLowerCase()
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const isMobile = /iphone|ipad|ipod|android/i.test(ua)

  return isSafari || isMobile
}
