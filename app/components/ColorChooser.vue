<template>
  <UPopover mode="hover" @update:open="$event ? showPicker = false : ''">
    <UButton :class="full ? '' : 'p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted'" color="neutral" :variant="full ? 'outline' : 'ghost'">
      <span 
        class="rounded-full border-2 size-4" 
        :class="isDarkColor(color).value ? 'border-white/10' : 'border-black/10'"
        :style="{ 'background-color': color || 'none' }" 
      />
      <span v-if="full" class="truncate">Color</span>
    </UButton>
    <template #content> 
      <div class="grid grid-cols-3 gap-2 p-2">
        <UButton 
          v-for="paletteColor in darkPalette" :key="paletteColor" 
          class="p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted" 
          color="neutral" 
          variant="ghost" 
          @click="color = paletteColor"
          >
          <span 
            class="rounded-full border-2 border-black/10 size-6" 
            :class="isDarkColor(paletteColor).value ? 'border-white/10' : 'border-black/10'"
            :style="{ 'background-color': paletteColor || 'none' }" 
          />
        </UButton>
      </div>
      <UButton color="neutral" variant="link" @click="showPicker = true">more...</UButton>
      <UColorPicker v-if="showPicker" v-model="color" class="p-2" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
  const color = defineModel<string>({ default: '#ffffff' })
  const { full = false } = defineProps<{ full?: boolean }>()

  const showPicker = ref(false)

  const pastelPalette = [
    '#FDE8E8', '#FFE4B3', '#FFF4B5', '#E6F8C1', '#C1EAF8', 
    '#D7C4F1', '#F1C4E0', '#F8C2C7', '#F8D1C1', '#FFF0F5', 
    '#E0FFFF', '#FFFFF8'
  ];

  const darkPalette = pastelPalette.map(color => {
    const shadeColor = (col: string, percent: number) => {
      const num = parseInt(col.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = ((num >> 8) & 0x00ff) + amt;
      const B = (num & 0x0000ff) + amt;
      return (
        "#" +
        (
          0x1000000 +
          (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
          (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
          (B < 255 ? (B < 1 ? 0 : B) : 255)
        )
          .toString(16)
          .slice(1)
      );
    };

    return shadeColor(color, -50); // Darken by 50%
  });
</script>
