import { TodoProvider } from '../../context/todo';
import TodoList from '../TodoList';


function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
