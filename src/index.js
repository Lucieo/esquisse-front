import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from "react-router-dom";

import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

const cache = new InMemoryCache();
const httpLink = new HttpLink({
  headers: { authorization: localStorage.getItem('esquisse-token') },
  uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
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
  dataIdFromObject: o=>o.id
});


cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('esquisse-token'),
  },
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <App/>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
