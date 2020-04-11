import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { ContextProvider } from './context/ContextProvider';

import './App.css';

import Routes from './routes';

const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_ENDPOINT });
const withToken = setContext(async () => {
  const token = localStorage.getItem("@comopedir:token");

  return {
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    localStorage.removeItem('@comopedir:business');
    localStorage.removeItem('@comopedir:businessId');
    localStorage.removeItem('@comopedir:token');
  }
});
const authFlowLink = withToken.concat(resetToken);
const link = authFlowLink.concat(httpLink);

const client = new ApolloClient({ link, cache });

function App() {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <ContextProvider>
          <Routes />
        </ContextProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}

export default App;
