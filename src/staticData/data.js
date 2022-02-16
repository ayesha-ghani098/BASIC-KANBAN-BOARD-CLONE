const Columns = [
{
    id: "column-1",
    columnTitle: "Column One",
    taskIds: ['task-1','task-2','task-3'],
  },

  {
    id: "column-2",
    columnTitle: "Column Two",
    taskIds: ['task-4'],
  },
  {
    id: "column-3",
    columnTitle: "Column Three",
    taskIds: ['task-5'],
  },
]
  
  const Tasks = [
    {
      id: "task-1",
      title:'TASK 1',
      content: "This is Task 1",
    },
   {
      id: "task-2",
      title:'TASK 2',
      content: "This is Task 2",
    },
   {
      id: "task-3",
      title:'TASK 3',
      content: "This is Task 3",
    },
    {
      id: "task-4",
      title:'TASK 4',
      content: "This is Task 4",
    },
   {
      id: "task-5",
      title:'TASK 5',
      content: "This is Task 5",
    },
  ]


  const columnOrder=["column-1"]



export { Columns,columnOrder,Tasks};
