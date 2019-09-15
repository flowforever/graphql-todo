import React, {useCallback} from 'react';
import {EDITING_TODO} from "../recucers/newTodo/newTodoActionTypes";
import {ADD_TODO} from "../recucers/todo/todoActionTypes";
import {NewTodoDump} from "./NewTodoDump";
import {useRootStore} from "../stores";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";

export const NewTodo = () => {
    const { state: { newTodo }, dispatch } = useRootStore();

    const ADD_TODO_Mutation = gql`
        mutation  AddTodo($todo: TodoInput){
            addTodo(todo: $todo) {
                text,
                id,
            }
        }
    `;

    const [postTodo] = useMutation(ADD_TODO_Mutation);

    const onUpdate = useCallback(e => dispatch({ type: EDITING_TODO, todo: e.target.value }), []);

    const onAdd = useCallback(value => {
        (async () => {
            const { data: {addTodo} } = await postTodo({
                variables: {
                    todo: {
                        text: value
                    }
                }
            });

            dispatch({ type: ADD_TODO, todo: value, id: addTodo.id });

        })()

    }, []);

    return (
        <NewTodoDump
            onAdd={onAdd}
            onUpdate={onUpdate}
            newTodo={newTodo}
        />
    );
};
