import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Menu from './components/menu';
import Profile from './components/profile'
import Charts from './components/charts'
import './App.scss';

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <header>
                <Menu/>
            </header>
            <Route path="/" exact component={Profile}/>
            <Route path="/charts" exact component={Charts}/>
            <Route path="/logged" exact component={Profile}/>
        </Router>
    </Provider>
);

App.propTypes = {
    store: PropTypes.object.isRequired
};

export default App;
