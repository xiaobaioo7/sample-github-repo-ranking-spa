import {
  INVALIDATE_REPOSITORIES,
  REQUEST_REPOSITORIES,
  RECEIVE_REPOSITORIES
} from '../actions/repository'

const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  lastUpdated: null
};


export default function repository(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_REPOSITORIES:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_REPOSITORIES:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_REPOSITORIES:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.repositories,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
