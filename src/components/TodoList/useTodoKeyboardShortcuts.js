import { VALUE_A, VALUE_S, VALUE_ESCAPE, VALUE_SHIFT } from 'keycode-js';
import { useTodoDispatch, actionTypes } from "../../context/todo";
import { inputModes } from '../../services/mode';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";


export default function useTodoKeyboardShortcuts() {
    const dispatch = useTodoDispatch();
    const createModeKeys = [VALUE_SHIFT, VALUE_A];
    const searchModeKeys = [VALUE_SHIFT, VALUE_S];
    const noInputModeKeys = [VALUE_ESCAPE];

    useKeyboardShortcut(createModeKeys, () => dispatch({ type: actionTypes.toggleMode, value: inputModes.add }));
    useKeyboardShortcut(searchModeKeys, () => dispatch({ type: actionTypes.toggleMode, value: inputModes.search }));
    useKeyboardShortcut(noInputModeKeys, () => dispatch({ type: actionTypes.toggleMode, value: inputModes.none }));
}