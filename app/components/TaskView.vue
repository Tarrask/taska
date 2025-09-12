<template>
<div 
  class="border-2 border-black/10 dark:border-white/10 rounded p-2 w-96 [[draggable=true]]:cursor-move [&.dragging]:opacity-0 max-w-full" 
  :class="`task-${task.size} ${isBackgroundDark ? 'text-white' : 'text-black'}`"
  :style="{ 'background-color': backgroundColor }"
  :draggable="!editing"
  @dblclick="editTask()"
>
  <div v-if="editing">
    <UInput v-model="editableTask.title" placeholder="Task Title" class="mb-1 w-full" />
    <UInput v-model="editableTask.topic" placeholder="Topic Name" class="w-full" />
    <div class="mt-2 flex justify-end gap-2">
      <UButton size="sm" color="neutral" @click="cancelTask">Cancel</UButton>
      <UButton size="sm" color="primary" @click="saveTask">Save</UButton>
      <UButton v-if="deletable" size="sm" color="error" @click="$emit('delete', task)">Delete</UButton>
      <ColorChooser v-model="editableTask.color" size="sm" :full="true" />
      <UButton size="sm" color="primary" icon="pajamas:task-done" @click="$emit('done', task)">Done</UButton>
      <USelectMenu v-model="editableTask.size" size="sm" :items="TaskSizes" />
    </div>
  </div>
  <div v-else>
    <h2 class="text-2xl">{{ task.title }}</h2>
    <h3 :class="isBackgroundDark ? 'text-white/50' : 'text-black/50'">{{ task.topic }}</h3>
    <ColorChooser v-model="editableTask.color" :full="false" @update:model-value="saveTask" />
  </div>
</div>
</template>

<script setup lang="ts">
  import type { Task } from '~~/types/Task'
  const  TaskSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
  const editing = defineModel<boolean>('editing', { default: false });
  const { 
    editable = true,
    deletable = true,
    task = { id: '', title: '', topic: '', size: 'xs' }
  } = defineProps<{ 
    editable?: boolean 
    deletable?: boolean
    task?: Task
  }>();

  const emit = defineEmits<{
    save: [Task],
    cancel: [],
    delete: [Task],
    done: [Task]
  }>()

  const editableTask = ref<{  
    title: string
    topic: string
    color: number|string
    size: Task['size']
   }>({ title: task.title, topic: task.topic, color: task.color || 0, size: 'sm' })

  watchEffect(() => {
    if(!editing.value) {
      editableTask.value = { 
        title: task.title, 
        topic: task.topic,
        color: task.color || 0,
        size: task.size || 'sm'
      }
    }
  })

  const { toCssColor } = useColorPalette()

  const backgroundColor = toCssColor(() => editableTask.value.color)
  const isBackgroundDark = isDarkColor(backgroundColor)

  function editTask() {
    if(!editing.value && editable) {
      editableTask.value = { 
        title: task.title, 
        topic: task.topic,
        color: task.color || '#ffffff',
        size: task.size || 'sm'
      }
      editing.value = true
    }
  }

  function cancelTask() {
    editing.value = false
    emit('cancel')
  }

  function saveTask() {
    editing.value = false
    emit('save', {
      ...task,
      ...editableTask.value
    })
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
