import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.scss";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// We need to store the State of our user in the App. firebase {auth} needs
// to have access to the State so it can pass that information to all of our
// components that need it.

// To store state in that App we need to change it to a 'class' component:
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
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // userRef: a 'documentRef object' that can perform CRUD operations on our database.
        // snapshot: an object we get from the referenceObject: userRef
        // 'snapshot' object allows us to check if it .exists and get
        // it's .data() method.
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          // setState() is async so to console.log the results when it finally happens
          // we pass console.log as the second function in setState() 
          // }, () => {
          //   console.log(this.state);
          // });
          });
        });
      }
      this.setState({currentUser: userAuth});
    });
  }
  // when this lifecycle is called, you will be unsubscribed from auth.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
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
