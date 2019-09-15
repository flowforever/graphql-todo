import {ADD_TODO} from "../todo/todoActionTypes";
import {EDITING_TODO} from "./newTodoActionTypes";

export function newTodoReducers(state = '', {type, todo}) {
    switch (type) {
        case ADD_TODO:
            return '';

        case EDITING_TODO:
            return todo;
    }

    return state;
}