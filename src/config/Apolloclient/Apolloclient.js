import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri : 'https://kedai-mate.hasura.app/v1/graphql',
    cache : new InMemoryCache(),
    headers : {
         'x-hasura-admin-secret':'c04g9HvzYnZeeiCVMvS3B8HQTpWoCSBQlp5mPKUkrHnaojXP9IcUfz9ahcdwbVWP'
    }
})
export default client