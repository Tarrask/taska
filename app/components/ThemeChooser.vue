<template>
  <UButton 
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    @click="updateTheme($event, isDark ? 'light' : 'dark')"
  />
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

function updateTheme (event: MouseEvent, selectedTheme: string) {
  if (!document.startViewTransition) {
    colorMode.value = selectedTheme
    return
  }

  console.log('event:', event, document.documentElement)
  

  const d1 = Math.sqrt(
    Math.pow(event.clientX - document.documentElement.clientLeft, 2) + 
    Math.pow(event.clientY - document.documentElement.clientTop, 2))
  const d2 = Math.sqrt(
    Math.pow(event.clientX - (document.documentElement.clientLeft + document.documentElement.clientWidth), 2) + 
    Math.pow(event.clientY - document.documentElement.clientTop, 2))
  const d3 = Math.sqrt(
    Math.pow(event.clientX - document.documentElement.clientLeft, 2) + 
    Math.pow(event.clientY - (document.documentElement.clientTop + document.documentElement.clientHeight), 2))
  const d4 = Math.sqrt(
    Math.pow(event.clientX - (document.documentElement.clientLeft + document.documentElement.clientWidth), 2) + 
    Math.pow(event.clientY - (document.documentElement.clientTop + document.documentElement.clientHeight), 2))

  console.log('dimension:', {
    clientTop: document.documentElement.clientTop,
    clientLeft: document.documentElement.clientLeft,
    clientWidth: document.documentElement.clientWidth,
    clientHeight: document.documentElement.clientHeight,
    clientX: event.clientX,
    clientY: event.clientY,
    d1, d2, d3, d4
  })

  const dim = Math.max(d1, d2, d3, d4)

  document.documentElement.style.setProperty('--view-transition-mouseX', `${event.clientX}px`)
  document.documentElement.style.setProperty('--view-transition-mouseY', `${event.clientY}px`)
  document.documentElement.style.setProperty('--view-transition-circleMaxSize', `${dim}px`)
  document.startViewTransition(() => {
    console.log('startViewTransition')
    colorMode.value = selectedTheme
  })
}
</script>

<style>
:root {
  --view-transition-duration: 300ms;
  --view-transition-mouseX: 0px;
  --view-transition-mouseY: 0px;
  --view-transition-circleMaxSize: 2000px;
}

::view-transition-old(root) {
  animation-delay: var(--view-transition-duration);
}

::view-transition-new(root) {
  animation: circle-in var(--view-transition-duration) ease-in;
}

@keyframes move-in {
  from { translate: 100% 0; }
  to { translate: 0 0; }
}

@keyframes move-out {
  from { transate: 0 0; }
  to { translate: -100% 0; }
}

@keyframes circle-in {
  from { clip-path: circle(0px at var(--view-transition-mouseX) var(--view-transition-mouseY)) }
  to { clip-path: circle(var(--view-transition-circleMaxSize) at var(--view-transition-mouseX) var(--view-transition-mouseY)) }
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --view-transition-duration: 0ms;
  }
}
</style>
