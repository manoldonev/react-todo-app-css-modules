import { useTodoState } from "../../../context/todo";
import { MODE_NONE } from "../../../services/mode";

import styles from './Info.module.scss';


export default function Info() {
    const { mode } = useTodoState();
    const INFO_SHORTCUT_KEYS = 'Press `Shift + S` to search and `Shift + A` to create a new item.';
    const INFO_CANCEL_SHORTCUT_KEY = 'Press `Esc` to cancel.';

    const message = mode === MODE_NONE ? INFO_SHORTCUT_KEYS : INFO_CANCEL_SHORTCUT_KEY;

    return <p className={styles.Info}>{message}</p>;
}