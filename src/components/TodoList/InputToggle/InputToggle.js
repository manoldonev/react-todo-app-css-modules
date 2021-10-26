import PropTypes from 'prop-types';
import InputBox from '../InputBox';
import SearchBox from '../SearchBox';
import { inputModes } from '../../../services/mode';

function InputToggle(props) {
    const { mode, query } = props;
    if (mode === inputModes.add) {
        return <InputBox />;
    }

    if (mode === inputModes.search) {
        return <SearchBox query={query} />;
    }

    return null;
}

InputToggle.propTypes = {
    mode: PropTypes.oneOf(Object.values(inputModes)).isRequired,
    query: PropTypes.string
}

export default InputToggle;