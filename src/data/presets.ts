// The wheel used in the game show 'Wheel of Fortune'.
export interface Iprize {
  name: string,
  freq: number,
  bg: string
}

export const PRESET1: Iprize[] = [
  { name: 'ебучий сигейм ', freq: 3, bg: '#CE93D8' },
  { name: 'паравозы', freq: 3, bg: '#FFF59D' },
  { name: 'судный день', freq: 5, bg: '#f3d' },
  { name: 'котята', freq: 1, bg: '#538524' },
  { name: 'Я дурной', freq: 1, bg: '#461534' }
]
