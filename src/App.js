import React from 'react';
import Header from './components/Header';
import SideBar from './components/SideBar';
import styled from 'styled-components';
/* import { Counter } from './features/counterSlice'; */
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';
function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return (
      <AppLoadingContainer>
        <AppLoadingContents>
          <img
            src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/306_Slack_logo-512.png'
            alt='test'
          />
          <Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
        </AppLoadingContents>
      </AppLoadingContainer>
    );
  }
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <div>
            <Header />
            <AppBody>
              <SideBar />
              <Switch>
                <Route path='/' exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </div>
        </>
      )}
    </Router>
  );
}

export default App;

const AppLoadingContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
