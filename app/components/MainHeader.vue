<template>
  <header 
    class="
    bg-blue-400 text-white border-black/20
    dark:bg-blue-900 dark:text-white
    p-4 text-xl font-bold border-b-1 
  ">
    Taska
    <ClientOnly v-if="!colorMode?.forced">
      <UButton 
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        @click="isDark = !isDark"
      />
    </ClientOnly>
  </header>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set(_isDark) {
    colorMode.value = _isDark ? 'dark' : 'light'
  }
})
</script>
