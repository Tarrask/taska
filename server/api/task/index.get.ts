export default defineEventHandler((event) => {
  return [
    { id: 'a01', title: 'Sample Task 1', project: 'Sample Project', size: 'xs' },
    { id: 'a02', title: 'An other task 2', project: 'Sample Project', size: 'sm' },
    { id: 'a03', title: 'An other task 3', project: 'Sample Project', size: 'lg' },
    { id: 'a04', title: 'An other task 4', project: 'Sample Project', size: 'xs' }
  ]
})
