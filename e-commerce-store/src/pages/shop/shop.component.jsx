import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import {
//   firestore,
//   convertCollectionsSnapshotToMap,
// } from '../../firebase/firebase.utils';

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
// selector for isLoading info
import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

// Wrap the components that will be loading in the WithSpinner function and set that to a new variable here:
const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// Our 'shop' page is nested inside of a route, Route automatically passes in 'match' 'location' and 'history'
// 'match' helps us to dynamically display the specific ShopPage in whatever route we put it.
// '/:collectionId' allows us to pass through the URL path through 'match' into our collection.component.

// To access state we need to switch this to a class component. access {match} through props.
// now write componentDidMount method where we subscribe and unsub. from our reference when we unmount.
// fetch snapshot from our collection array in firestore in componentDidMount using firestore utils.
// get data using .onSnapshot fetching data whenever it mounts or re-renders. it will return snapshot object
// transform data into shape we need and add values we don't have like route name. do this in a function in firebase.utils
// pass in the snapshot to our new convert... util and we'll get our data with all the properties we want like routename.
class ShopPage extends React.Component {
  // add state to our component and initialize loading to activate spinner.
  // constructor() {
  //   super();
  //   this.state = {
  //     loading: true,
  //   };
  // }
  // we can shorten this with newer syntax *no longer need because we moved loading to our Thunk function.
  // state = {
  //   loading: true,
  // };
  // unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync(); // Async Thunk method to kick off multiple actions. To help reducer with async state props and getting collections from Firebase.
  }
  //  *** removed for Thunk stuff ***
  //   const { updateCollections } = this.props;
  //   const collectionRef = firestore.collection('collections'); // reference to collection we named 'collections'
  //   //   this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
  //   //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   //     updateCollections(collectionsMap);
  //   //     this.setState({ loading: false }); // deactivate spinner by setting loading to false.
  //   //   });
  //   //  We are using an observer/subscription pattern we get with firestore that gives us a snapshot any time the db is modified. If 'observable' object is unavailable we can change it to a promise based function, instead of .onSnapshot.
  //   // .get() firestore function that returns a promise with all document(s) from a collection. It returns a promise with a snapshot object just like we got before. However we do not get a continuous subscription like we do with our observer pattern above, only when component mounts.
  //   collectionRef.get().then(snapshot => {
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     updateCollections(collectionsMap);
  //     this.setState({ loading: false }); // deactivate spinner by setting loading to false.
  //   });
  //   // Using a regular Fetch API call instead of our previous methods. However the data returned is not in the right pattern
  //   // fetch(
  //   //   'https://firestore.googleapis.com/v1/projects/e-commerce-e56a3/databases/(default)/documents/collections'
  //   // )
  //   //   .then(response => response.json())
  //   //   .then(collections => console.log(collections));
  // }

  // // to use our new wrapped components we need to use the render={} method in our <Route />
  // // we also need to send the match object data (e.g. history, location) that we use inside of our <CollectionPage/> component
  // // and make sure we pass it through our new spinner wrappers as 'props'
  render() {
    const { match, isCollectionFetching, areCollectionsLoaded } = this.props;
    // const { loading } = this.state; no longer need because Thunk. instead of fetching isLoading from the state,
    // we can now replace isLoading with our async Thunk: isCollectionFetching passed from our state to our props
    return (
      <div className='shop-page'>
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner
              isLoading={isCollectionFetching}
              {...props}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner
              isLoading={!areCollectionsLoaded}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

// When we refresh a shop collection page, the app will break because when our collection component is loading it expects our collection data to be loaded already. However because React renders our components before calling the 'ComponentDidMount' lifecycle the collection has not been returned yet. Our isLoading value is initially set to false, which in turn renders a missing collection object.
//  To remedy: instead of checking whether collection is fetching, we need to check whether our collection has loaded, by making another selector which checks whether our collection is !!falsey: e.g.null or not.
// Now if 'isLoading' is true it will render the spinner, if false it will render the wrapped component. If our collection Has loaded our new areCollectionsLoaded selector returns true, it will trigger our loading spinner instead of loading the collection page, so we must switch the return value with '!'

const mapStateToProps = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching,
  areCollectionsLoaded: selectIsCollectionsLoaded,
});

// const mapDispatchToProps = dispatch => ({
//   updateCollections: collectionsMap =>
//     dispatch(updateCollections(collectionsMap)),
// });
const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
