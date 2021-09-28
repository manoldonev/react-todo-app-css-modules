import React, { useReducer } from "react";
import produce from "immer";
import { getAll, createNew } from '../services/todo';

const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();
const ADD_ITEM = 'add-item';
const TOGGLE_ITEM = 'toggle-item';

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
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function TodoProvider({ children }) {
    const items = getAll();
    const [state, dispatch] = useReducer(todoReducer, { items });

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                {children}
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
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

export { TodoProvider, useTodoState, useTodoDispatch, ADD_ITEM, TOGGLE_ITEM };