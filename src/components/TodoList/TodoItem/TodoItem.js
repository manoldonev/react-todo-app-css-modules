
import styles from './TodoItem.module.scss';


function TodoItem(props) {
    const { item } = props;

    return (
        <li className={styles.TodoItem}>
            <div className={styles.TodoItem__content}>
                <label>
                    <input type="checkbox" className={styles.checkbox} />
                    {item.text}
                </label>
            </div>
        </li>
    );
}

export default TodoItem;