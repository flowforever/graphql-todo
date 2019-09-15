import {ADD_TODO, LOAD_TODO, LOAD_TODO_SUCCESS, REMOVE_TODO, UPDATE_TODO} from './todoActionTypes';
import {DataStatus} from "../../constants/DataStatus";
import {createMerger} from "../../functions/createMerger";

export const initialTodoState = {
    todos: [],
    status: DataStatus.initial,
};


export function todoReducers(state = initialTodoState, { type, ...params }) {
    const { todos } = state;

    const mergeState = createMerger(state);

    switch (type) {

        case LOAD_TODO:
            return mergeState({ status: DataStatus.loading });

        case LOAD_TODO_SUCCESS:
            return mergeState({
                status: DataStatus.loading,
                todos: params.todos,
            });

        case ADD_TODO:
            return mergeState({
                todos: [
                    ...todos,
                    { text: params.todo, id: params.id || Math.random() },
                ]
            });

        case REMOVE_TODO:
            return mergeState({ todos: todos.filter(o => o.id !== params.id) });

        case UPDATE_TODO:
            return mergeState({
                todos: todos.map(item => {
                    if (item.id === params.todo.id) {
                        return Object.assign({}, item, params.todo);
                    }
                    return item;
                })
            });

    }

    return state;
}
