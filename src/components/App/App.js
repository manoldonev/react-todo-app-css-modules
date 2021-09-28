import TodoList from '../TodoList';

import './App.scss';

const todos = [
  {
    id: '1',
    text: 'Learn JavaScript',
    completed: true
  },
  {
    id: '2',
    text: 'Learn React',
    completed: false
  },
  {
    id: '3',
    text: 'Build a React app',
    completed: false
  }
];

function App() {
  return (
    <TodoList items={todos} />
  );
}

export default App;
