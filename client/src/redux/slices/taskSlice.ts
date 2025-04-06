import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
  },
});

export const { addTask, removeTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer