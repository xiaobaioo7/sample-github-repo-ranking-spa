import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  invalidateRepositories,
  fetchRepositoriesIfNeeded
} from '../actions/repository'
import Repositories from '../components/repositories'

class TopStarredRepositories extends Component {  
  static propTypes = {
    items: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchRepositoriesIfNeeded())
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateRepositories())
    dispatch(fetchRepositoriesIfNeeded())
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

    let repositoriesDom;
    let loadingStyle;
    if (!items.length) {
      repositoriesDom = (
        <h2>{isFetching ? 'Loading data...' : 'There is no data'}</h2>
      )
    } else {
      loadingStyle = isFetching ? 'loading-content' : loadingStyle;
      repositoriesDom = (
        <div className={loadingStyle}>
          <Repositories data={items} />
        </div>
      )
    }

    return (
      <article className="list-content-wrapper">
        <header>
          <h1>Top 100 Starred GitHub Repositories</h1>
        </header>
        <section className="control-content">
          <ul>
            <li>{lastUpdatedDom}</li>
            <li>{refreshButton}</li>
          </ul>
        </section>
        <section className="list-content">
          {repositoriesDom}
        </section>
      </article>
    )
  }
}

const mapStateToProps = state => {
  const { repository } = state
  const {
    isFetching,
    lastUpdated,
    items
  } = repository

  return {
    items,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(TopStarredRepositories)
