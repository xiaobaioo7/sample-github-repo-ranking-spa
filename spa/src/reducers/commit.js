import {
  INVALIDATE_COMMITS,
  REQUEST_COMMITS,
  RECEIVE_COMMITS,
  SET_CURRENT_REPOSITORY
} from '../actions/commit'

const initialState = {
  currentRepository: null
};

const initialRepositoryCommitsState = {
  isFetching: false,
  didInvalidate: true,
  items: [],
  lastUpdated: null
}

const repositoryCommits = (state = initialRepositoryCommitsState, action) => {
  switch (action.type) {
    case INVALIDATE_COMMITS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_COMMITS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_COMMITS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.commits,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default function commit(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_COMMITS:
    case REQUEST_COMMITS:
    case RECEIVE_COMMITS:
      return {
        ...state,
        [action.repositorySlug]: repositoryCommits(state[action.repositorySlug], action)
      }
    case SET_CURRENT_REPOSITORY:
      return {
        ...state,
        currentRepository: action.repositorySlug
      }
    default:
      return state
  }
}
