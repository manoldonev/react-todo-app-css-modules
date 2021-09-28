import { useTodoState } from '../../context/todo';
import TodoItem from './TodoItem';
import InputBox from './InputBox';
import Footer from './Footer';

import styles from './TodoList.module.scss';


export default function TodoList() {
    const { items } = useTodoState();
    const count = items.length;

    return (
        <section className={styles.TodoList}>
            <h1 className={styles.TodoList__header}>Things to do</h1>
            <InputBox />
            <ul className={styles.TodoList__content}>
                {items.map(item => <TodoItem key={item.id} data={item} />)}
            </ul>
            <Footer count={count} />
        </section>
    );
}
