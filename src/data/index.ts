const COLORS = ['#ffffff']
const NUM_COLORS = COLORS.length

export const DEFAULT_FREQUENCY = 1
export const DEFAULT_TEXT_COLOR = '#fff'

// Returns a list containing the prizes that can be won.
// Возвращает список, которые могут выиграть.
export const getAvailable = (prizes: any) => {
  const list:any = []
  prizes.forEach((prize:any) => {
    if (!prize.hide) {
      list.push(prize)
    }
  })
  return list
}
// Returns the default background color given the prize index.
// Возвращает цвет фона по умолчанию с учетом индекса приза.
export const getDefaultBgColor = (index: any) => COLORS[index % NUM_COLORS]
// Returns the total frequency of the list of prizes.
// Возвращает шанс выиграша.
export const getTotalFrequency = (prizes: any) => {
  let count = 0
  prizes.forEach((prize: any) => {
    count += prize.freq || DEFAULT_FREQUENCY
  })
  return count
}
