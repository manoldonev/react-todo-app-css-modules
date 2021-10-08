import React, { useReducer } from "react";
import produce from "immer";
import PropTypes from 'prop-types';
import { getAll, createNew } from '../services/todo';
import { getOptions as getFilterOptions, FILTER_ALL } from "../services/filter";
import { MODE_ADD, getModes as getInputModes } from "../services/mode";


const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();
const filterOptions = getFilterOptions();
const inputModes = getInputModes();

const ADD_ITEM = 'add-item';
const SEARCH_ITEM = 'search-item';
const TOGGLE_ITEM = 'toggle-item';
const TOGGLE_FILTER = 'toggle-filter';
const TOGGLE_MODE = 'toggle-mode';

function todoReducer(state, action) {
    switch (action.type) {
        case ADD_ITEM: {
            const itemText = action.value;
            if (itemText == null) {
                throw new Error(`${action.type}: item text not specified`);
            }

            const nextId = (state.items.length + 1).toString();
            return produce(state, draft => {
                draft.items.push(createNew({ id: nextId, text: itemText }));
            });
        }
        case SEARCH_ITEM: {
            const queryString = action.value;
            if (queryString == null) {
                throw new Error(`${action.type}: query not specified`);
            }

            return produce(state, draft => {
                draft.query = queryString;
            });
        }
        case TOGGLE_ITEM: {
            const itemId = action.value;
            if (itemId == null) {
                throw new Error(`${action.type}: item id not specified`);
            }

            return produce(state, draft => {
                const itemToToggle = draft.items.find(item => item.id === itemId);
                if (itemToToggle == null) {
                    throw new Error(`${action.type}: item with id ${itemId} not found`);
                }
                itemToToggle.done = !itemToToggle.done;
            });
        }
        case TOGGLE_FILTER: {
            const filterValue = action.value;
            if (!(filterValue in filterOptions)) {
                throw new Error(`${action.type}: filter ${filterValue} not found`);
            }

            return produce(state, draft => {
                draft.filter = filterValue;
            });
        }
        case TOGGLE_MODE: {
            const mode = action.value;
            if (!inputModes.includes(mode)) {
                throw new Error(`${action.type}: input mode ${mode} not recognized`);
            }

            return produce(state, draft => {
                if (draft.mode !== mode) {
                    draft.mode = mode;
                    draft.query = '';
                    draft.filter = FILTER_ALL;
                }
            });
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }

    }
}

function TodoProvider({ children }) {
    const items = getAll();
    const [state, dispatch] = useReducer(todoReducer, { items, mode: MODE_ADD, filter: FILTER_ALL, query: '' });

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

TodoProvider.propTypes = {
    children: PropTypes.element.isRequired
}

function useTodoState() {
    const context = React.useContext(TodoStateContext);
    if (context == null) {
        throw new Error(`useTodoState must be within a TodoProvider`);
    }

    return context;
}

function useTodoDispatch() {
    const context = React.useContext(TodoDispatchContext);
    if (context == null) {
        throw new Error(`useTodoDispatch must be within a TodoProvider`);
    }

    return context;
}

export {
    TodoProvider,
    useTodoState,
    useTodoDispatch,
    ADD_ITEM,
    SEARCH_ITEM,
    TOGGLE_ITEM,
    TOGGLE_FILTER,
    TOGGLE_MODE
};