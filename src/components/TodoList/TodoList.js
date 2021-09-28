import PropTypes from 'prop-types';
import { useTodoState } from '../../context/todo';
import TodoItem from './TodoItem';
import InputBox from './InputBox';

import styles from './TodoList.module.scss';


function TodoList() {
    const { items } = useTodoState();

    return (
        <section className={styles.TodoList}>
            <h1 className={styles.TodoList__header}>Things to do</h1>
            <InputBox />
            <ul className={styles.TodoList__content}>
                {items.map(item => <TodoItem key={item.id} item={item} />)}
            </ul>
        </section>
    );
}

TodoList.propTypes = {
    items: PropTypes.array.isRequired
}

export default TodoList;