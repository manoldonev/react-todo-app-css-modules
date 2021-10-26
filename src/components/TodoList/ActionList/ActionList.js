import PropTypes from 'prop-types';
import cn from 'classnames';
import { useTodoDispatch, actionTypes } from '../../../context/todo';
import { getModes, MODE_ADD, MODE_SEARCH } from '../../../services/mode';

import styles from './ActionList.module.scss';


function ActionList(props) {
    const { mode } = props;
    const dispatch = useTodoDispatch();
    function handleClick(e) {
        dispatch({ type: actionTypes.toggleMode, value: e.target.value });
    }

    return (
        <ul className={styles.ActionList}>
            <li className={styles.ActionList__item}>
                <button type="button" aria-label="Create Mode"
                    value={MODE_ADD}
                    onClick={handleClick}
                    className={cn(styles.ImageButton____add,
                        { [styles.ImageButton____selected]: mode === MODE_ADD })}
                    data-testid="action-add">
                </button>
            </li>
            <li className={styles.ActionList__item}>
                <button type="button" aria-label="Search Mode"
                    value={MODE_SEARCH}
                    onClick={handleClick}
                    className={cn(styles.ImageButton____search,
                        { [styles.ImageButton____selected]: mode === MODE_SEARCH })}
                    data-testid="action-search">
                </button>
            </li>
        </ul>
    );
}

ActionList.propTypes = {
    mode: PropTypes.oneOf(getModes())
};

export default ActionList;