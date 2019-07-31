import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component.jsx'

import { connect } from 'react-redux';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { checkUserSession } from './redux/user/user.actions'

class App extends React.Component {
    
  unsubscribeFromAuth = null

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession()
  };

  componentWillUnmount() {
    //closing old subscription 
    this.unsubscribeFromAuth();
  }
  
  render() {
    return (
      <div>
          <Header />
          <Switch>
            <Route exact path = '/' component = {HomePage} />
            <Route path = '/shop' component = {ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUpPage />) } />
          </Switch>
        </div>
      );
    };
  }
  
  const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  })

  const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
  })

  export default connect(mapStateToProps, mapDispatchToProps)(App);
  