<template>
  <div v-if="taskError" class="p-4 bg-red-100 text-red-800">
    Error: {{ taskError.message }}
  </div>
  <div v-else class="p-2 flex flex-col h-full grow justify-end bg-gray-50" @dragover.prevent="dragLocation = { x: $event.clientX, y: $event.clientY }">
    <div class="flex gap-2">
      <UButton class="mb-2 self-start" color="neutral" variant="outline" icon="material-symbols:add" @click="newTask" />
      <UButton class="mb-2 self-start" color="neutral" variant="outline" icon="material-symbols:sync" @click="refreshTasks()" />
    </div>
    <div ref="container" class="flex flex-col gap-2" @dragover="dragover">
      <TaskView
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :data-index="index"
        @update:task="updateTask"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
  </div>
  <TaskView 
    v-if="draggedTaskIndex !== null && tasks[draggedTaskIndex] !== null" 
    :task="tasks[draggedTaskIndex || 0]" 
    :editable="false"
    class="absolute pointer-events-none shadow-lg"
    :style="{
      top: dragLocation ? `${dragLocation.y - dragAnchor.y}px` : '-1000px',
      left: dragLocation ? `${dragLocation.x - dragAnchor.x}px` : '-1000px',
    }"
  />
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task.d.ts'

const { 
  data: tasksData, 
  error: taskError,
  refresh: refreshTasks
} = await useFetch<Array<Task>>('/api/task')

const tasks = ref<Array<Task>>(tasksData.value || [])
watch(tasksData, (newTasks) => {
  tasks.value = newTasks || []
})

async function newTask() {
  
}

async function updateTask (updatedTask: Task) {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
  saveTasks()
}

async function saveTasks () {
  await fetch('/api/task', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks.value)
  })
}

//
// Drag and Drop Logic
//
const container = useTemplateRef<HTMLElement>('container')
const draggedTaskIndex = ref<null | number>(null)
const dragLocation = ref<{ x: number, y: number } | null>(null)
const dragAnchor = ref<{ x: number, y: number }>({ x: 0, y: 0})

function dragstart (event: DragEvent) {
  console.log('dragstart', event)
  if (event.target instanceof HTMLElement) {
    event.target.classList.add('dragging')
    draggedTaskIndex.value = Number(event.target.dataset.index)
    dragLocation.value = { x: event.clientX, y: event.clientY }
    dragAnchor.value = { 
      x: event.clientX - event.target.offsetLeft, 
      y: event.clientY - event.target.offsetTop
    }
  }
}

function dragend (event: DragEvent) {
  console.log('dragend', event)
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
    draggedTaskIndex.value = null
  }
  saveTasks()
}

function dragover (event: DragEvent) {
  event.preventDefault();
  dragLocation.value = { x: event.clientX, y: event.clientY }
  if (container.value) {
    const children = [...container.value.children]
    const index = children.reduce((newIndex, child, index) => {
      const box = child.getBoundingClientRect()

      if (index === draggedTaskIndex.value || draggedTaskIndex.value === null) {
        return newIndex
      }

      const offset = event.clientY - box.top - box.height / 2
      if (offset > 0 && index > draggedTaskIndex.value) {
        return index
      } 
      if (offset < 0 && index < draggedTaskIndex.value) {
        return index
      }
      else {
        return newIndex
      }
    }, -1)

    if (tasks.value && draggedTaskIndex.value !== null && index !== draggedTaskIndex.value && index !== -1) {
      const draggedTask = tasks.value.splice(draggedTaskIndex.value, 1)[0]
      if (draggedTask) {
        tasks.value.splice(index, 0, draggedTask)
        draggedTaskIndex.value = index
      }
    }
  }
}
</script>
