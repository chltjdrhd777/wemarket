import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'components/Auth';
import Home from 'components/Home';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <Switch>
        {isLogged ? (
          <Route exact path="/">
            <Home />
          </Route>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}

export default App;
