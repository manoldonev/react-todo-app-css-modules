import TodoItem from './TodoItem';
import InputBox from './InputBox';
import Footer from './Footer';
import { useTodoState } from '../../context/todo';
import { applyFilter } from '../../services/filter';

import styles from './TodoList.module.scss';


export default function TodoList() {
    const { items, filter } = useTodoState();
    const filteredItems = applyFilter(items, filter);
    const count = filteredItems.length;

    return (
        <section className={styles.TodoList}>
            <h1 className={styles.TodoList__header}>Things to do</h1>
            <InputBox />
            <ul className={styles.TodoList__content}>
                {filteredItems.map(item => <TodoItem key={item.id} data={item} />)}
            </ul>
            <Footer count={count} filter={filter} />
        </section>
    );
}
