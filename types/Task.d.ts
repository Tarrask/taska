export { Task, TaskSizes }

type Task = {
  id: string
  title: string
  topic: string
  color?: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const TaskSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
