import React, {useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {TodoListDump} from "./TodoListDump";
import {useRootStore} from "../stores";
import {LOAD_TODO, LOAD_TODO_SUCCESS, REMOVE_TODO} from "../recucers/todo/todoActionTypes";
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "@apollo/react-hooks";

export const TodoList = ({ newTodoEditor }) => {
    const { state: { todoStore }, dispatch } = useRootStore();

    const TODO_LIST_QUERY = gql`
        {
            todos: getTodoList(pager: 1) {
                id,
                text,
            }
        }
    `;

    const { loading, error, data } = useQuery(TODO_LIST_QUERY);

    useEffect(() => {
        if (loading) {
            dispatch({ type: LOAD_TODO });
        }

        if (data) {
            const { todos } = data;
            dispatch({ type: LOAD_TODO_SUCCESS, todos })
        }


    }, [loading, error, data]);

    const REMOVE_TODO_Mutation = gql`
        mutation  RemoveTodo($id: String){
            removeTodo(id: $id)
        }
    `;

    const [removeTodo] = useMutation(REMOVE_TODO_Mutation);

    const removeTodoItem = useCallback(id => {
        (async () => {
            await removeTodo({ variables: { id } });
            dispatch({ type: REMOVE_TODO, id });
        })()
    }, []);

    return (
        <TodoListDump
            todos={todoStore.todos}
            newTodoEditor={newTodoEditor}
            onRemoveItem={removeTodoItem}
        />
    );
};

TodoList.propTypes = { newTodoEditor: PropTypes.object.isRequired };
