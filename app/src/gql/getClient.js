import ApolloClient from 'apollo-boost';

export function getClient() {
    return new ApolloClient({
        uri: 'http://localhost:9002/graphql'
    });
}
