export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const dataStorage = useStorage('data')
  dataStorage.setItem('tasks', body)

  setResponseStatus(event, 204)
})
