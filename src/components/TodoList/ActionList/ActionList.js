import PropTypes from 'prop-types';
import cn from 'classnames';
import { useTodoDispatch, actionTypes } from '../../../context/todo';
import { inputModes } from '../../../services/mode';

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
                    value={inputModes.add}
                    onClick={handleClick}
                    className={cn(styles.ImageButton____add,
                        { [styles.ImageButton____selected]: mode === inputModes.add })}
                    data-testid="action-add">
                </button>
            </li>
            <li className={styles.ActionList__item}>
                <button type="button" aria-label="Search Mode"
                    value={inputModes.search}
                    onClick={handleClick}
                    className={cn(styles.ImageButton____search,
                        { [styles.ImageButton____selected]: mode === inputModes.search })}
                    data-testid="action-search">
                </button>
            </li>
        </ul>
    );
}

ActionList.propTypes = {
    mode: PropTypes.oneOf(Object.values(inputModes)).isRequired
};

export default ActionList;