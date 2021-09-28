
import styles from './TodoItem.module.scss';


function TodoItem(props) {
    const { item } = props;

    return (
        <li className={styles.TodoItem}>
            <label><input type="checkbox" value="" />{item.text}</label>
        </li>
    );
}

export default TodoItem;