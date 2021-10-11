import PropTypes from 'prop-types';
import ActionList from '../ActionList';
import Filter from '../Filter';

import styles from './Footer.module.scss';


function Footer(props) {
    const { count, filter } = props;

    return (
        <div className={styles.Footer}>
            <ActionList />
            <label className={styles.Footer__label} data-testid='counter'>
                <span className={styles.Footer__counter}>{count}</span>
                {' items left'}
            </label>
            <Filter filter={filter} />
        </div>
    );
}

Footer.propTypes = {
    count: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired
};

export default Footer;