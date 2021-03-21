// The wheel used in the game show 'Wheel of Fortune'.
export const PRESET1: any = {
  name: 'Wheel of Fortune',
  winningText: 'Result: <b>%s</b>',
  background: '',
  removeWinning: false,
  prizes: [
    { name: 'ебучий сигейм ', freq: 3, bg: '#CE93D8', text: '#222', hide: false, fontMod: 1 },
    { name: 'паравозы', freq: 3, bg: '#FFF59D', text: '#222', hide: false, fontMod: 1 },
    { name: 'судный день', freq: 3, bg: '#f3d', text: '#222', hide: false, fontMod: 1 }
  ]
}

export const DEFAULT_PRESETS = [PRESET1]
