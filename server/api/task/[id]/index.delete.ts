import type { Task } from '~~/types/Task.d.ts'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const dataStorage = useStorage('data')
  const tasks = (await dataStorage.getItem<Array<Task>>('tasks')) || []
  const index = tasks.findIndex(t => t.id === id) 
  if (index === -1) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Task not found',
    })
  }
  
  tasks.splice(index, 1)
  await dataStorage.setItem('tasks', tasks)
  setResponseStatus(event, 204)
})
