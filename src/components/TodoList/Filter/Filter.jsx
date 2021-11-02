import cn from 'classnames';
import PropTypes from 'prop-types';
import { useTodoDispatch, actionTypes } from '../../../context/todo';
import { filterOptions } from '../../../services/filter';

import styles from './Filter.module.scss';

function Filter(props) {
  const { filter } = props;
  const dispatch = useTodoDispatch();

  function computeCssClass(key) {
    return cn(styles.LinkButton, { [styles.LinkButton____selected]: key === filter });
  }

  function toggleFilter(key) {
    dispatch({ type: actionTypes.toggleFilter, value: key });
  }

  return (
    <ul className={styles.Filter}>
      {Object.entries(filterOptions).map(([key, value]) => (
        <li className={styles.Filter__item} key={key}>
          <button type="button" className={computeCssClass(key)} onClick={() => toggleFilter(key)}>
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default Filter;
