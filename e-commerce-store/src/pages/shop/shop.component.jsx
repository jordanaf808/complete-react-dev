import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

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
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const CollectionRef = firestore.collection('collections'); // fetch collection we named 'collections'
    CollectionRef.onSnapshot(async snapshot => {
      convertCollectionsSnapshotToMap(snapshot);
    });
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

export default ShopPage;
