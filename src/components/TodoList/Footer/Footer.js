import PropTypes from 'prop-types';
import { getOptions as getFilterOptions } from '../../../services/filter';
import { getModes } from '../../../services/mode';
import ActionList from '../ActionList';
import Filter from '../Filter';

import styles from './Footer.module.scss';


function Footer(props) {
    const { count, filter, mode } = props;

    return (
        <div className={styles.Footer}>
            <ActionList mode={mode} />
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
    filter: PropTypes.oneOf(Object.values(getFilterOptions())).isRequired,
    mode: PropTypes.oneOf(getModes()).isRequired
};

export default Footer;