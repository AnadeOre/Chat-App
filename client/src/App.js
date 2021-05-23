import React from 'react';
import { Container } from 'react-bootstrap'
import { AuthProvider } from './Context/AuthContext'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword'
import UpdateProfile from './Components/UpdateProfile';
import Chat from './Components/Chat'
import './App.css'

function App() {

  return (

    <Container className='background'>
      <div >
        <Router>
          <AuthProvider>

            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/chat" component={Chat} />
            </Switch>

          </AuthProvider>
        </Router>
      </div>
    </Container>

  );
}

export default App;
