import { useTodoDispatch, useTodoState, actionTypes } from '../../../context/todo';

import styles from './SearchBox.module.scss';


export default function SearchBox() {
    const { query } = useTodoState();
    const dispatch = useTodoDispatch();

    function handleChange(e) {
        const {value} = e.target;
        dispatch({ type: actionTypes.searchItem, value });
    }

    return (
        <input type="text"
            className={styles.SearchBox}
            placeholder="Search"
            value={query}
            onChange={handleChange} />
    );
}
