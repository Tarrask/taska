export const isDarkColor = (color: MaybeRefOrGetter<string>) => {
  return computed(() =>  {
    const colorValue = toValue(color)
    const r = parseInt(colorValue.substring(1, 3), 16)
    const g = parseInt(colorValue.substring(3, 5), 16)
    const b = parseInt(colorValue.substring(5, 7), 16)
    const y = ((r * 299) + (g * 587) + (b * 114)) / 1000

    return y < 128
  })
}
