<template>
<div 
  class="border-2 border-black/10 rounded p-2 w-96 [[draggable=true]]:cursor-move [&.dragging]:opacity-0" 
  :class="`task-${task.size}`"
  :style="{ 'background-color': task.color || '#ffffff' }"
  :draggable="!editing"
  @dblclick="editTask()"
>
  <div v-if="editing">
    <UInput v-model="editableTask.title" placeholder="Task Title" class="mb-1 w-full" />
    <UInput v-model="editableTask.topic" placeholder="Topic Name" class="w-full" />
    <div class="mt-2 flex justify-end gap-2">
      <UButton size="sm" color="neutral" variant="outline" @click="cancelTask">Cancel</UButton>
      <UButton size="sm" color="primary" @click="saveTask">Save</UButton>
      <UButton v-if="deletable" size="sm" color="error" @click="$emit('delete', task)">Delete</UButton>
      <UPopover>
        <UButton label="Choose color" color="neutral" variant="outline">
          <template #leading>
            <span :style="chipStyle" class="size-3 rounded-full" />
          </template>
        </UButton>
        <template #content>
          <UColorPicker v-model="editableTask.color" class="p-2" />
        </template>
      </UPopover>
      <UButton size="sm" color="primary" icon="pajamas:task-done" @click="$emit('done', task)">Done</UButton>
      <USelectMenu v-model="editableTask.size" :items="TaskSizes" />
    </div>
  </div>
  <div v-else>
    <h2 class="text-2xl">{{ task.title }}</h2>
    <h3 class="text-gray-500">{{ task.topic }}</h3>
  </div>
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
    color: string
    size: Task['size']
   }>({ title: task.title, topic: task.topic, color: task.color || '#ffffff', size: 'sm' })

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

  const chipStyle = computed(() => ({ backgroundColor: editableTask.value.color }))

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
