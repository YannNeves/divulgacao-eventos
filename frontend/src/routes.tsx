import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';


import Login from './pages/User/LoginUser';
import CreateUser from './pages/User/CreateUser';
import ListEvent from './pages/Event/ListEvent';
import CreateEvent from './pages/Event/CreateEvent';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Login} path="/" exact />
      <Route component={CreateUser} path="/create-user" />
      <Route component={ListEvent} path="/list-event" />
      <Route component={CreateEvent} path="/create-event" />
    </BrowserRouter>
  )
}

export default Routes;