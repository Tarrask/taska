import type { Task } from '~~/types/Task.d.ts'

export default defineEventHandler(async (event) => {
  const newTask = await readBody(event)
  
  // ajoute un id à la tâche
  newTask.id = crypto.randomUUID()

  // enregistre la tâche dans le storage en temps que premier élément du tableau
  const dataStorage = useStorage('data')
  const tasks = (await dataStorage.getItem<Array<Task>>('tasks')) || []
  tasks.unshift(newTask)
  await dataStorage.setItem('tasks', tasks)

  // retourne la tâche créée
  return newTask
})
