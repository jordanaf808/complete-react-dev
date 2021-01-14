//  import 'Effects' from sagas to perform actions (e.g. create or listen)
//  'takeEvery' - Listens for every action of a specific type. It allows us to perform an asynchronous request without 'blocking' our app from running js code. we can perform other actions or Sagas meanwhile. We yield control of this action to the middleware. If we receive another takeEvery action type, the middleware can determine whether to cancel the previous action/other actions
import { takeEvery } from 'redux-saga/effects';

import ShopActionTypes from './shop.types';

// All generator functions* have to 'yield' something!
export function* fetchCollectionsAsync() {
  yield console.log('Hello World');
}

// Our first Saga:
// This Saga will 'yield' when a specific action type comes in (1st argument)
// The 2nd argument is another generator function* that will run in response to the action type
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
