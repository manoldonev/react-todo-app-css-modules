import PropTypes from 'prop-types';
import { inputModes } from "../../../services/mode";

import styles from './Info.module.scss';


function Info(props) {
    const { mode } = props;
    const INFO_SHORTCUT_KEYS = 'Press `Shift + S` to search and `Shift + A` to create a new item.';
    const INFO_CANCEL_SHORTCUT_KEY = 'Press `Esc` to cancel.';

    const message = mode === inputModes.none ? INFO_SHORTCUT_KEYS : INFO_CANCEL_SHORTCUT_KEY;

    return <p className={styles.Info}>{message}</p>;
}

Info.propTypes = {
    mode: PropTypes.oneOf(Object.values(inputModes)).isRequired
}

export default Info;