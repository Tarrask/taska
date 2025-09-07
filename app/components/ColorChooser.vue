<template>
  <UPopover mode="hover" @update:open="$event ? showPicker = false : ''">
    <UButton :class="full ? '' : 'p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted'" color="neutral" :variant="full ? 'outline' : 'ghost'">
      <span 
        class="rounded-full border-2 border-black/10 size-4" 
        :style="{ 'background-color': color || 'none' }" 
      />
      <span v-if="full" class="truncate">Color</span>
    </UButton>
    <template #content> 
      <div class="grid grid-cols-3 gap-2 p-2">
        <UButton 
          v-for="pastelPolor in pastelPalette" :key="pastelPolor" 
          class="p-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted" 
          color="neutral" 
          variant="ghost" 
          @click="color = pastelPolor"
          >
          <span 
          class="rounded-full border-2 border-black/10 size-6" 
          :style="{ 'background-color': pastelPolor }" 
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
</script>
