import { TodoProvider } from '../../context/todo';
import TodoList from '../TodoList';

import './App.scss';


function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
