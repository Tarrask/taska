<template>
  <UPopover mode="hover" @update:open="$event ? showPicker = false : ''">
    <UButton :class="full ? '' : 'p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted'" color="neutral" :variant="full ? 'outline' : 'ghost'">
      <span 
        class="rounded-full border-2 size-4" 
        :class="isDarkColor(cssColor).value ? 'border-white/10' : 'border-black/10'"
        :style="{ 'background-color': cssColor || 'none' }" 
      />
      <span v-if="full" class="truncate">Color</span>
    </UButton>
    <template #content> 
      <div class="grid grid-cols-3 gap-2 p-2">
        <UButton 
          v-for="(paletteColor, index) in palette" :key="paletteColor" 
          class="p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted" 
          color="neutral" 
          variant="ghost" 
          @click="color = index"
          >
          <span 
            class="rounded-full border-2 border-black/10 size-6" 
            :class="isDarkColor(paletteColor).value ? 'border-white/10' : 'border-black/10'"
            :style="{ 'background-color': paletteColor || 'none' }" 
          />
        </UButton>
      </div>
      <UButton color="neutral" variant="link" @click="showPicker = true">more...</UButton>
      <UColorPicker v-if="showPicker" v-model="cssColor" class="p-2" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
  const color = defineModel<number|string>({ default: '#ffffff' })
  const { full = false } = defineProps<{ full?: boolean }>()

  const showPicker = ref(false)

  const { palette, toCssColor } = useColorPalette()

  const cssColor = computed<string>({
    get () {
      return toCssColor(color).value
    },
    set (cssColor) {
      color.value = cssColor
    }
  })
</script>
