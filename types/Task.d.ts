export { Task }

type Task = {
  id: string
  title: string
  project: string
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}
