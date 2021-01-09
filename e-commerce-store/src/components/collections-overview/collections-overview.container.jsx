import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsCollectionFetching,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
});
