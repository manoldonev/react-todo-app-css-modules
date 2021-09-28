import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

import styles from './TodoList.module.scss';


function TodoList(props) {
    const { items } = props;

    return (
        <section className={styles.TodoList}>
            <h1 className={styles.TodoList__header}>Things to do</h1>
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