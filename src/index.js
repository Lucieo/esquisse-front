import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router} from "react-router-dom";



const cache = new InMemoryCache();
const link = new HttpLink({
  headers: { authorization: localStorage.getItem('esquisse-token') },
  uri: 'http://localhost:4000/graphql'
});

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
