import { KEY_RETURN } from 'keycode-js';
import { useState } from 'react';
import { useTodoDispatch, ADD_ITEM } from '../../../context/todo';

import styles from './InputBox.module.scss';

export default function InputBox() {
    const [value, setValue] = useState('');
    const dispatch = useTodoDispatch();

    function handleKeyUp(e) {
        if (e.keyCode === KEY_RETURN) {
            dispatch({ type: ADD_ITEM, value: value.trim() });
            setValue('');
        }
    }

    return (
        <input type="text"
            className={styles.InputBox}
            placeholder="Add New"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyUp={handleKeyUp} />
    );
}
