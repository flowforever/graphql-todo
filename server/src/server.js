const fs = require('fs');
const path = require('path');
const { ApolloServer, gql, PubSub } = require('apollo-server');

const pubSub = new PubSub();

const NEW_TODO_PUBSUB_KEY = 'NEW_TODO';

const typeDefs = gql(
    fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf8').toString()
);

const resolvers = {
    Query: {
        getTodoList,
        getTodo,
        getCategoryList,
    },
    Mutation: {
        addTodo,
        removeTodo,
    },
    Subscription: {
        newTodo: {
            subscribe: () => pubSub.asyncIterator([NEW_TODO_PUBSUB_KEY])
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

let todoList = [
    { text: 'ok 1', id: 'id1', categoryId: '1' },
    { text: 'ok 1.1', id: 'id1.1', categoryId: '1' },
    { text: 'ok 2', id: 'id2', categoryId: '2' },
    { text: 'ok 3', id: 'id3', categoryId: '3' },
];

async function getTodoList() {
    return todoList;
}

async function getTodo(_, {id}) {
    return todoList.find(o => o.id === id);
}

async function addTodo(_, {todo}) {
    console.log('resolve add todo', todo);
    const newTodo = {
        id: `id-${Math.random()}-${Date.now()}`,
        text: todo.text,
        date: new Date(),
    };
    todoList.push(newTodo);
    pubSub.publish(NEW_TODO_PUBSUB_KEY, { newTodo: { todo } });
    return newTodo;
}

async function removeTodo(_, {id}) {
    todoList = todoList.filter(o => o.id !== id);
    return true;
}

async function getCategoryList(obj, args, context, info) {
    console.log(info.operation)
}



module.exports = server;
