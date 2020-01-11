import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '../components/Footer';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

/* If the page refreshes then the authorization token will still be in local storage
 * so we set the authorization token in the redux store to repopulate (rehydrate is word used in video)
 * the current state of the app - in this case the tweet list
 */
if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // Prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch(e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
        <Footer />
      </div>
    </Router>
  </Provider>
);

export default App;
