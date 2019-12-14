import React from 'react'
import PropTypes from 'prop-types'
import Repository from './repository'

const Repositories = ({data}) => (
  <div className="inner-grid-content">
    {data.map((repository, i) =>
      <Repository key={repository.id} index={i} data={repository} />
    )}
  </div>
)

Repositories.propTypes = {
  data: PropTypes.array.isRequired
}

export default Repositories
