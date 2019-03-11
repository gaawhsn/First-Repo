import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from './modules/header';
import { FormToCreateNewList } from './modules/formToCreateNewList';
import { BoardWithAllLists } from './modules/boardWithAllLists';
import { fetchLists } from './state/lists';
import 'normalize.css/normalize.css';
import './App.scss';

class App extends PureComponent {

  componentDidMount = () => {
    this.props.fetchLists()
  }

  render() {

    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <div className="App-button-container">
              <button className="App-button">
                <Link to="/createlist">Create List</Link>
              </button>
              <button className="App-button">
                <Link to="/lists" style={{ textDecoration: 'none' }}>Show Lists</Link>
              </button>
            </div>
            <div>
              <Route path="/createlist" component={FormToCreateNewList} />
              <Route path="/lists" component={BoardWithAllLists} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchLists
}

export default connect(null, mapDispatchToProps)(App);
