export const INVALIDATE_COMMITS = 'INVALIDATE_COMMITS'
export const REQUEST_COMMITS = 'REQUEST_COMMITS'
export const RECEIVE_COMMITS = 'RECEIVE_COMMITS'
export const SET_CURRENT_REPOSITORY = 'SET_CURRENT_REPOSITORY'

export const invalidateCommits = (repositorySlug) => ({
  type: INVALIDATE_COMMITS,
  repositorySlug
})

export const requestCommits = (repositorySlug) => ({
  type: REQUEST_COMMITS,
  repositorySlug
})

export const receiveCommits = (repositorySlug, json) => ({
  type: RECEIVE_COMMITS,
  repositorySlug,
  commits: json.map(commit => {
    const { 
      sha, 
      commit: commitJson,
      author: authorJson
    } = commit
    return {
      sha,
      authorName: commitJson.author.name,
      authorAvatarUrl: authorJson.avatar_url,
      commitDatetime: commitJson.author.date,
      commitMessage: commitJson.message
    }
  }),
  receivedAt: Date.now()
})

const fetchCommits = (repositorySlug) => dispatch => {
  dispatch(requestCommits(repositorySlug))
  const sinceYesterday = new Date(Date.now() - 86400 * 1000).toISOString();
  return fetch(`https://api.github.com/repos/${repositorySlug}/commits?since=${sinceYesterday}&per_page=100`)
    .then(response => response.json())
    .then(json => dispatch(receiveCommits(repositorySlug, json)))
}

const shouldFetchCommits = (state, repositorySlug) => {
  const repositoryCommits = state[repositorySlug]
  if (!repositoryCommits) {
    return true;
  }
  if (repositoryCommits.isFetching) {
    return false
  }
  return repositoryCommits.didInvalidate
}

export const fetchCommitsIfNeeded = (repositorySlug) => (dispatch, getState) => {
  if (shouldFetchCommits(getState(), repositorySlug)) {
    return dispatch(fetchCommits(repositorySlug))
  }
}

export const setCurrentRepository =  (repositorySlug) => ({
  type: SET_CURRENT_REPOSITORY,
  repositorySlug
})
