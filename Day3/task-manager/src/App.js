import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useCallback, useMemo, useReducer, useRef } from 'react';
import { initialState, taskReducer } from './reducer/taskReducer';
import ThemeToggle from './components/ThemeToggle';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function AppContent() {
  const [state, dispatch] = useReducer(taskReducer, initialState)
  const { theme } = useTheme()
  const renderCount = useRef()
  renderCount.current++

  //memoized handler
  const addTask = useCallback((text) => {
    dispatch({ type: "ADD_TASK", payload: text })
  }, [])

  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id })
  }, [])

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }, [])

  //expensive calculation
  const completedCount = useMemo(() => {
    console.log("Calculating computed task...")
    return state.tasks.filter((t) => t.done).length;
  }, [state.tasks])

  return(
    <div className={theme}>
      <h2>Task Manager</h2>
      <p>App Render Count: {renderCount.current}</p>
      <ThemeToggle/>
      <TaskInput addTask={addTask}/>
      <h3>Completed Tasks: {completedCount}</h3>

      <TaskList
        tasks={state.tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
