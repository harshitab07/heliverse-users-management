import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import HomeScreen from './pages/HomeScreen';
import TeamScreen from './pages/TeamScreen';
import UserScreen from './pages/UserScreen'
import UserEditScreen from './pages/UserEditScreen';
import TeamIdScreen from './pages/TeamIdScreen';
import TeamListScreen from './pages/TeamListScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="search/:keyword" element={<HomeScreen />} />
      <Route path="/page/:pageNumber" element={<HomeScreen />} />
      <Route path="search/:keyword/page/:pageNumber" element={<HomeScreen />} />
      <Route path='/user/:id' element={<UserScreen />} /> 
      <Route path='/user/:id/edit' element={<UserEditScreen />} /> 
      <Route path='/team' element={<TeamScreen />} /> 
      <Route path='/team/:id' element={<TeamIdScreen />} /> 
      <Route path='/teamlist' element={<TeamListScreen />} /> 
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

