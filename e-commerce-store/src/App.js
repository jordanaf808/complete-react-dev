import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.scss";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";

// For our app to authenticate the Current User we need to
// pass auth through the State so our components have access
// to that information.

// To pass state to our components we need to change this to a
// Class Component.
// function App() {
//   return (
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  // must close auth when app closes, so we don't have any memory leaks
  // init a unsubscribe method set to null by default
  unsubscribeFromAuth = null;
  // pass in the current user to the unsubscribe method
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  // when this lifecycle is called, you will be unsubscribed from auth.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
