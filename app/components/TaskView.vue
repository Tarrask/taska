<template>
<div 
  class="bg-white border border-gray-300 rounded p-2 w-96 cursor-move [&.dragging]:opacity-0" 
  :class="`task-${task.size}`"
  :draggable="!editing"
  @dblclick="editTask()"
>
  <div v-if="editing">
    <UInput v-model="editableTask.title" placeholder="Task Title" class="mb-1 w-full" />
    <UInput v-model="editableTask.project" placeholder="Project Name" class="w-full" />
    <div class="mt-2 flex justify-end gap-2">
      <UButton size="sm" color="neutral" variant="outline" @click="cancelTask">Cancel</UButton>
      <UButton size="sm" color="primary" @click="saveTask">Save</UButton>
    </div>
  </div>
  <div v-else>
    <h2 class="text-2xl">{{ task.title }}</h2>
    <h3 class="text-gray-500">{{ task.project }}</h3>
  </div>
</div>
</template>

<script setup lang="ts">
  import type { Task } from '~/types/Task.d.ts'

  const task = defineModel<Task>('task', { default: { id: '', title: '', project: '', size: 'xs' } });
  const { editable = true } = defineProps<{ editable?: boolean }>();
  const editing = ref<boolean>(false)

  const editableTask = ref<{  
    title: string
    project: string
   }>({ title: task.value.title, project: task.value.project })

  function editTask() {
    if(!editing.value && editable) {
      editableTask.value = { 
        title: task.value.title, 
        project: task.value.project 
      }
      editing.value = true
    }
  }

  function cancelTask() {
    editing.value = false
  }

  function saveTask() {
    console.log('Saving task:', editableTask.value)
    task.value = {
      ...task.value,
      title: editableTask.value.title,
      project: editableTask.value.project
    }
    editing.value = false
  }
</script>

<style scoped>
.task-xs {
  width: 25rem;
  min-height: 5rem;
}
.task-sm {
  width: 35rem;
  min-height: 7rem;
}
.task-md {
  width: 50rem;
  min-height: 10rem;
}
.task-lg {
  width: 70rem;
  min-height: 14rem;
}
.task-xl {
  width: 100rem;
  min-height: 20rem;
}
.task-2xl {
  width: 150rem;
  min-height: 30rem;
}
</style>
