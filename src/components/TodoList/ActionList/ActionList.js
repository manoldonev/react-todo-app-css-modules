import cn from 'classnames';

import styles from './ActionList.module.scss';


export default function ActionList() {
    return (
        <ul className={styles.ActionList}>
            <li className={styles.ActionList__item}>
                <button type="button"
                    className={cn(styles.ImageButton, styles.ImageButton____add)}>
                </button>
            </li>
            <li className={styles.ActionList__item}>
                <button type="button"
                    className={cn(styles.ImageButton, styles.ImageButton____search)}>
                </button>
            </li>
        </ul>
    );
}