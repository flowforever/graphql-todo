import React from 'react';
import {TodoList} from "./TodoList";
import {RootStoreContextProvider} from "../stores";
import {NewTodo} from "./NewTodo";

import {ApolloProvider} from '@apollo/react-hooks';
import {getClient} from "../functions/getClient";

export function App({}) {
    return (
        <ApolloProvider client={getClient()}>
            <RootStoreContextProvider>
                <TodoList newTodoEditor={<NewTodo />} />
            </RootStoreContextProvider>
        </ApolloProvider>
    );
}

