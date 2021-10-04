import { useTodoDispatch, TOGGLE_MODE } from "../../context/todo";
import { MODE_ADD, MODE_SEARCH, MODE_NONE } from '../../services/mode';
import useKeyboardShortcut from "../../hooks/useKeyboardShortcut";
import { VALUE_A, VALUE_S, VALUE_ESCAPE, VALUE_CONTROL } from 'keycode-js';

export default function useKeyboardShortcuts() {
    const dispatch = useTodoDispatch();
    const createModeKeys = [VALUE_CONTROL, VALUE_A];
    const searchModeKeys = [VALUE_CONTROL, VALUE_S];
    const noInputModeKeys = [VALUE_ESCAPE];

    useKeyboardShortcut(createModeKeys, () => dispatch({ type: TOGGLE_MODE, value: MODE_ADD }));
    useKeyboardShortcut(searchModeKeys, () => dispatch({ type: TOGGLE_MODE, value: MODE_SEARCH }));
    useKeyboardShortcut(noInputModeKeys, () => dispatch({ type: TOGGLE_MODE, value: MODE_NONE }));
}