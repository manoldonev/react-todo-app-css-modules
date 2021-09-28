import PropTypes from 'prop-types';
import cn from 'classnames';
import { useTodoDispatch, TOGGLE_ITEM } from '../../../context/todo';

import styles from './TodoItem.module.scss';


function TodoItem(props) {
    const { data } = props;
    const dispatch = useTodoDispatch();
    const cssClass = cn(styles.TodoItem, { [styles.TodoItem____done]: data.done });

    function handleChange(e) {
        dispatch({ type: TOGGLE_ITEM, value: data.id });
    }

    return (
        <li className={cssClass}>
            <div className={styles.TodoItem__content}>
                <label>
                    <input type="checkbox"
                        className={styles.checkbox}
                        checked={data.done}
                        onChange={handleChange} />
                    {data.text}
                </label>
            </div>
        </li>
    );
}

TodoItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        done: PropTypes.bool
    })
};

export default TodoItem;