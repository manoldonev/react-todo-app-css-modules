import PropTypes from 'prop-types';
import cn from 'classnames';
import { useTodoDispatch, actionTypes } from '../../../context/todo';

import styles from './TodoItem.module.scss';


function TodoItem(props) {
    const { data } = props;
    const dispatch = useTodoDispatch();
    const cssClass = cn(styles.TodoItem, { [styles.TodoItem____done]: data.done });

    function handleChange() {
        dispatch({ type: actionTypes.toggleItem, value: data.id });
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
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
    })
};

export default TodoItem;