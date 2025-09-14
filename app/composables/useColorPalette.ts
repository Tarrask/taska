const palettes = {
  'light': [
    '#FDE8E8', '#FFE4B3', '#FFF4B5', '#E6F8C1', 
    '#C1EAF8', '#D7C4F1', '#F1C4E0', '#F8C2C7', 
    '#F8D1C1', '#FFF0F5', '#E0FFFF', '#FFFFF8', 
    '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'
  ],
  'dark': [
    '#836060', '#796d56', '#746d4a', '#58643e', 
    '#3e5e69', '#4c3d61', '#5e3a50', '#5f3d41', 
    '#63473d', '#5a3c46', '#395e5e', '#4e4e2f', 
    '#101010', '#202020', '#303030', '#404040'
  ]
} as const

type PaletteMode = keyof typeof palettes

export function useColorPalette () {
  const colorMode = useColorMode()

  const palette = computed(() => {
    return palettes[colorMode.value as PaletteMode] || palettes['light']
  })

  function toCssColor (color: MaybeRefOrGetter<number|string>) {
    return computed(() => {
      const colorValue = toValue(color)
      if(typeof colorValue === 'number') {
        return palette.value[colorValue] || '#808080'
      }

      return colorValue
    })
  }

  return { palette, toCssColor }
}
