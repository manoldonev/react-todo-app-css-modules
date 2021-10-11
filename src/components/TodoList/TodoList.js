
import { useTodoState } from '../../context/todo';
import { applyFilter, search } from '../../services/filter';
import TodoItem from './TodoItem';
import InputToggle from './InputToggle';
import Header from './Header';
import Footer from './Footer';
import Info from './Info';
import useTodoKeyboardShortcuts from './useTodoKeyboardShortcuts';

import styles from './TodoList.module.scss';


export default function TodoList() {
    const { items, mode, filter, query } = useTodoState();
    const filteredItems = applyFilter(search(items, query), filter);
    const count = filteredItems.length;

    useTodoKeyboardShortcuts();

    let listContent;
    if (filteredItems.length === 0) {
        listContent = <p className={styles.TodoList__info}>There are no items.</p>;
    } else {
        listContent = (
            <ul className={styles.TodoList__content} data-testid="todo-list">
                {filteredItems.map(item => <TodoItem key={item.id} data={item} />)}
            </ul>
        );
    }

    return (
        <section className={styles.TodoList}>
            <>
                <Header />
                <InputToggle mode={mode} query={query} />

                {listContent}

                <Footer count={count} filter={filter} mode={mode} />
            </>
            <Info mode={mode} />
        </section>
    );
}
