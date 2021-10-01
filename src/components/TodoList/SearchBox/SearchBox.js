import { useTodoDispatch, useTodoState, SEARCH_ITEM } from '../../../context/todo';

import styles from './SearchBox.module.scss';


export default function SearchBox() {
    const { query } = useTodoState();
    const dispatch = useTodoDispatch();

    function handleChange(e) {
        const value = e.target.value.trim();
        if (value != null) {
            dispatch({ type: SEARCH_ITEM, value });
        }
    }

    return (
        <input type="text" autoFocus
            className={styles.SearchBox}
            placeholder="Search"
            value={query}
            onChange={handleChange} />
    );
}
