
import Filter from '../Filter';
import styles from './Footer.module.scss';

export default function Footer(props) {
    const { count, filter } = props;

    return (
        <div className={styles.Footer}>
            <div className={styles.Footer__label}>
                <span className={styles.Footer__counter}>{count}</span>
                {' items left'}
            </div>
            <Filter filter={filter} />
        </div>
    );
}