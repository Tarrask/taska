export { Task }

type Task = {
  id: string
  title: string
  project: string
  color?: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
