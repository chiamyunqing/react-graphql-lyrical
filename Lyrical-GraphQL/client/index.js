import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';


import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
import { HashRouter, Routes, Route } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const Root = () => {
  return (
    <App>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<SongList />} />
          <Route exact path="/song/new" element={<SongCreate />} />
          <Route path="/song/:id" element={<SongDetail />} />
        </Routes>
      </HashRouter>
    </App>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
  , document.querySelector("#root"));
