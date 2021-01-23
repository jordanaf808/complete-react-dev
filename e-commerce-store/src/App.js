import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.scss';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

// import { auth, createUserProfileDocument } from './firebase/firebase.utils'; Removed for User Saga

// import { setCurrentUser } from './redux/user/user.actions'; Removed for User Saga
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    // *** Removed for User Saga
    // const { setCurrentUser } = this.props;
    // Removed for new Promise-based Auth method.
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);
    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         // this.setState({
    //         //   currentUser: {
    //         id: snapShot.id,
    //         ...snapShot.data(),
    //       });
    //     });
    //   }
    //   // this.setState({currentUser: userAuth});
    //   setCurrentUser(userAuth);
    // });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// give us access to this.props.currentUser
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

// dispatch an action we want to change a prop on. We set the prop we want,
// which goes to a func. which gets the 'user' object. then calls dispatch().
// dispatch tells redux to pass this action object with the 'user' payload
// to the reducers.
// *** Removed for User Saga
// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps, mapDispatchToProps)(App);
