import PropTypes from 'prop-types';
import InputBox from '../InputBox';
import SearchBox from '../SearchBox';
import { MODE_ADD, MODE_SEARCH, getModes } from '../../../services/mode';

function InputToggle(props) {
    const { mode, query } = props;
    if (mode === MODE_ADD) {
        return <InputBox />;
    }

    if (mode === MODE_SEARCH) {
        return <SearchBox query={query} />;
    }

    return null;
}

InputToggle.propTypes = {
    mode: PropTypes.oneOf(getModes()).isRequired,
    query: PropTypes.string
}

export default InputToggle;