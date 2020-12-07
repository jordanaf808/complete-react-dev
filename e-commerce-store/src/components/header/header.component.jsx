import React from "react";

import { Link } from "react-router-dom";
import { connect } from 'react-redux'; // connects your component to redux 
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);
// returns state which is the 'root reducer'. navigate to the value desired:
// root reducer(state)=> user reducer(user) => property(currentUser)
const  mapStateToProps = state => ({
  currentUser: state.user.currentUser
})
// 'connect': is a higher order component. they are just functions that take components as arguments
// and return a new 'souped-up' component.

export default connect(mapStateToProps)(Header);
