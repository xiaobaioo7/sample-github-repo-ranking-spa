import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import {
  invalidateCommits,
  fetchCommitsIfNeeded,
  setCurrentRepository
} from '../actions/commit'
import Commits from '../components/commits'

class LatestRepositoryCommits extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setCurrentRepository(this.getRepoSlug()))
    dispatch(fetchCommitsIfNeeded(this.getRepoSlug()))
  }

  getRepoSlug() {
    const { owner, repo } = this.props.match.params;
    return `${owner}/${repo}`;
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateCommits())
    dispatch(fetchCommitsIfNeeded(this.getRepoSlug()))
  }

  render() {
    const { items, isFetching, lastUpdated } = this.props

    let lastUpdatedDom;
    if (lastUpdated) {
      lastUpdatedDom = (
        <span>Last fetched: {new Date(lastUpdated).toLocaleTimeString()}</span>
      )
    }
    const refreshButton = (
      <button onClick={this.handleRefreshClick} disabled={isFetching}>
        Refresh
      </button>
    )

    let commitsDom;
    let loadingStyle;
    if (!items.length) {
      commitsDom = (
        <h2>{isFetching ? 'Loading data...' : 'There is no data'}</h2>
      )
    } else {
      loadingStyle = isFetching ? 'loading-content' : loadingStyle;
      commitsDom = (
        <div className={loadingStyle}>
          <Commits data={items} />
        </div>
      )
    }

    return (
      <article className="list-content-wrapper">
        <header>
          <h1>Latest Commits for Repository {this.getRepoSlug()} since yesterday</h1>
        </header>
        <section className="control-content">
          <ul>
            <li>{lastUpdatedDom}</li>
            <li>{refreshButton}</li>
          </ul>
        </section>
        <section className="list-content">
          {commitsDom}
        </section>
      </article>
    )
  }
}

const mapStateToProps = state => {
  const { commit } = state
  const { currentRepository } = commit
  const {
    isFetching,
    lastUpdated,
    items
  } = commit[currentRepository] || {
    isFetching: false,
    items: [],
    lastUpdated: null
  }

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default withRouter(connect(mapStateToProps)(LatestRepositoryCommits))
