import { useTodoDispatch, TOGGLE_MODE } from '../../../context/todo';
import { MODE_ADD, MODE_SEARCH } from '../../../services/mode';

import styles from './ActionList.module.scss';


export default function ActionList() {
    const dispatch = useTodoDispatch();

    function handleClick(e) {
        dispatch({ type: TOGGLE_MODE, value: e.target.value });
    }

    return (
        <ul className={styles.ActionList}>
            <li className={styles.ActionList__item}>
                <button type="button"
                    value={MODE_ADD}
                    onClick={handleClick}
                    className={styles.ImageButton____add}>
                </button>
            </li>
            <li className={styles.ActionList__item}>
                <button type="button"
                    value={MODE_SEARCH}
                    onClick={handleClick}
                    className={styles.ImageButton____search}>
                </button>
            </li>
        </ul>
    );
}