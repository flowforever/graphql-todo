import React, {createContext, useContext, useReducer} from "react";

import {todoReducers} from "../recucers/todo/todoReducers";
import {newTodoReducers} from "../recucers/newTodo/newTodoReducers";

import {combineReducers} from "../functions/combineReducers";

const rootReducer = combineReducers({
    todoStore: todoReducers,
    newTodo: newTodoReducers,
});

export const RootStoreContext = createContext({});

export const RootStoreContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, rootReducer(undefined, {}));
    const providerValue = { state, dispatch };

    return (
        <RootStoreContext.Provider value={providerValue}>
            {children}
        </RootStoreContext.Provider>
    );
};

export const useRootStore = () => {
    const { state, dispatch } = useContext(RootStoreContext);
    return { state, dispatch };
};
