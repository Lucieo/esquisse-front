import React from 'react';
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";

import Home from './Home';
import Profile from './Profile';
import Game from './Game';
import ConnectedPageContainer from 'components/ConnectedPageContainer'

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';
import { resolvers, localType } from 'graphQL/localState';
import PdfFormat from 'components/PdfFormat';

const cache = new InMemoryCache();

let apiBaseUrl;
const ssl = process.env.NODE_ENV === 'prod';

if (process.env.NODE_ENV === 'development') {
    apiBaseUrl = 'localhost:4000/graphql'
} else if (process.env.NODE_ENV === 'test') {
    apiBaseUrl = process.env.API_BASE_URL
} else {
    apiBaseUrl = 'esquisse-api.herokuapp.com/graphql'
}

const httpLink = new HttpLink({
    headers: { authorization: localStorage.getItem('esquisse-token') },
    uri: `http${ssl ? 's' : ''}://${apiBaseUrl}`
});

const wsLink = new WebSocketLink({
    uri: `ws${ssl ? 's' : ''}://${apiBaseUrl}`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    cache,
    link,
    credentials: 'include',
    localType, resolvers,
    dataIdFromObject: o => o.id
});


cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('esquisse-token'),
    },
});

export default function ConnectedPaged() {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <ConnectedPageContainer>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route
                            path="/game/:gameId"
                        >
                            <Game />
                        </Route>
                        <Route
                            path="/pdf/:gameId"
                        >
                            <PdfFormat />
                        </Route>
                    </Switch>
                </ConnectedPageContainer>
            </HashRouter>
        </ApolloProvider>
    )
}
