const fs = require('fs');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');


const typeDefs = gql(
    fs.readFileSync(path.resolve(__dirname, './schema.gql'), 'utf8').toString()
);

const todoList = [
    {text: 'ok', id: 'some very uniq id', id: 'id1'}
];

async function getTodos() {
    return todoList;
}

async function getTodo(_, {id}) {
    return todoList.find(o => o.id === id);
}

async function addTodo(_, {todo}) {
    console.log('resolve add todo', todo)
    const newTodo = {
        id: `id-${Math.random()}-${Date.now()}`,
        text: todo.text,
        date: new Date(),
    }
    todoList.push(newTodo);
    return todo;
}

const resolvers = {
    Query: {
        todos: getTodos,
        getTodos,
        getTodo,
    },
    Mutation: {
        addTodo,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

module.exports = server;
