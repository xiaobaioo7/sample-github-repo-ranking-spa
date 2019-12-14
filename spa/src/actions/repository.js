export const INVALIDATE_REPOSITORIES = 'INVALIDATE_REPOSITORIES'
export const REQUEST_REPOSITORIES = 'REQUEST_REPOSITORIES'
export const RECEIVE_REPOSITORIES = 'RECEIVE_REPOSITORIES'

export const invalidateRepositories = () => ({
  type: INVALIDATE_REPOSITORIES
})

export const requestRepositories = () => ({
  type: REQUEST_REPOSITORIES
})

export const receiveRepositories = json => ({
  type: RECEIVE_REPOSITORIES,
  repositories: json.items.map(item => {
    const {
      id,
      node_id: nodeId,
      name,
      full_name : fullName,
      owner,
      description,
      url,
      html_url: htmlUrl,
      stargazers_count: starCount,
      default_branch: defaultBranch
    } = item
    return {
      id,
      nodeId,
      name,
      fullName,
      owner,
      description,
      url,
      htmlUrl,
      starCount,
      defaultBranch
    }
  }),
  receivedAt: Date.now()
})

const fetchRepositories = () => dispatch => {
  dispatch(requestRepositories())
  return fetch(`https://api.github.com/search/repositories?q=stars:%3E=0&sort=stars&order=desc&per_page=100`)
    .then(response => response.json())
    .then(json => dispatch(receiveRepositories(json)))
}

const shouldFetchRepositories = (state) => {
  const { repository: repositories } = state
  if (!repositories) {
    return true
  }
  if (repositories.isFetching) {
    return false
  }
  return repositories.didInvalidate
}

export const fetchRepositoriesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchRepositories(getState())) {
    return dispatch(fetchRepositories())
  }
}
