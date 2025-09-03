export default defineEventHandler(async (event) => {

  const dataStorage = useStorage('data')
  const tasks = await dataStorage.getItem('tasks')

  return tasks || []
})
