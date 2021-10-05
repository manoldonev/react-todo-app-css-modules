import TodoItem from './TodoItem';
import InputToggle from './InputToggle';
import Footer from './Footer';
import Info from './Info';
import { useTodoState } from '../../context/todo';
import { applyFilter, search } from '../../services/filter';
import useTodoKeyboardShortcuts from './useTodoKeyboardShortcuts';

import styles from './TodoList.module.scss';


export default function TodoList() {
    const { items, mode, filter, query } = useTodoState();
    const filteredItems = applyFilter(search(items, query), filter);
    const count = filteredItems.length;

    useTodoKeyboardShortcuts();

    return (
        <section className={styles.TodoList}>
            <>
                <h1 className={styles.TodoList__header}>Things to do</h1>
                <InputToggle mode={mode} query={query} />

                <ul className={styles.TodoList__content}>
                    {filteredItems.map(item => <TodoItem key={item.id} data={item} />)}
                </ul>
                <Footer count={count} filter={filter} />
            </>
            <Info />
        </section>
    );
}
