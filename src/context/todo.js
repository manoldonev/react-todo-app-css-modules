import React, { useReducer } from "react";
import produce from "immer";
import PropTypes from 'prop-types';
import { getAll, createNew } from '../services/todo';
import { filterOptions } from "../services/filter";
import { inputModes } from "../services/mode";


const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();

const actionTypes = {
    addItem: 'ADD_ITEM',
    searchItem: 'SEARCH_ITEM',
    toggleItem: 'TOGGLE_ITEM',
    toggleFilter: 'TOGGLE_FILTER',
    toggleMode: 'TOGGLE_MODE'
};

function todoReducer(state, action) {
    switch (action.type) {
        case actionTypes.addItem: {
            const itemText = action.value;
            if (itemText == null) {
                throw new Error(`${action.type}: item text not specified`);
            }

            const nextId = (state.items.length + 1).toString();
            return produce(state, draft => {
                draft.items.push(createNew({ id: nextId, text: itemText }));
            });
        }
        case actionTypes.searchItem: {
            return produce(state, draft => {
                draft.query = action.value;
            });
        }
        case actionTypes.toggleItem: {
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
        case actionTypes.toggleFilter: {
            const filterValue = action.value;
            if (!(filterValue in filterOptions)) {
                throw new Error(`${action.type}: filter ${filterValue} not found`);
            }

            return produce(state, draft => {
                draft.filter = filterValue;
            });
        }
        case actionTypes.toggleMode: {
            const inputMode = action.value;
            if (!(inputMode in inputModes)) {
                throw new Error(`${action.type}: input mode ${inputMode} not recognized`);
            }

            return produce(state, draft => {
                if (draft.mode !== inputMode) {
                    draft.mode = inputMode;
                    draft.query = '';
                    draft.filter = filterOptions.all;
                }
            });
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }

    }
}

function TodoProvider({ children, reducer = todoReducer } = {}) {
    const items = getAll();
    const [state, dispatch] = useReducer(reducer, { items, mode: inputModes.add, filter: filterOptions.all, query: '' });

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

TodoProvider.propTypes = {
    children: PropTypes.element.isRequired,
    reducer: PropTypes.func
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
    todoReducer,
    actionTypes
};