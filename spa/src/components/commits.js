import React from 'react'
import PropTypes from 'prop-types'
import Commit from './commit'

const Commits = ({data}) => (
  <div className="inner-grid-content">
    {data.map((commit) =>
      <Commit key={commit.sha} data={commit} />
    )}
  </div>
)

Commits.propTypes = {
  data: PropTypes.array.isRequired
}

export default Commits
