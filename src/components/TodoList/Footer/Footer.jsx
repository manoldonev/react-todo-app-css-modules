import PropTypes from 'prop-types';
import { filterOptions } from '../../../services/filter';
import inputModes from '../../../services/mode';
import ActionList from '../ActionList';
import Filter from '../Filter';

import styles from './Footer.module.scss';

function Footer(props) {
  const { count, filter, mode } = props;

  return (
    <div className={styles.Footer}>
      <ActionList mode={mode} />
      <span className={styles.Footer__counter} data-testid="counter">
        <span className={styles.Footer__content}>{count}</span>
        {' items left'}
      </span>
      <Filter filter={filter} />
    </div>
  );
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  filter: PropTypes.oneOf(Object.values(filterOptions)).isRequired,
  mode: PropTypes.oneOf(Object.values(inputModes)).isRequired,
};

export default Footer;
