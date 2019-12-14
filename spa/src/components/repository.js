import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Repository = ({data, index}) => (
  <article>
    <header>
      <h2>#{index + 1}</h2>
    </header>
    <section className="author-content">
      <div className="image-wrapper">
        <img src={data.owner.avatar_url} alt={data.owner.login} />
      </div>
    </section>
    <section className="more-content">
      <ul>
        <li><strong>Name</strong> {data.name}</li>
        <li><strong>Owner</strong> {data.owner.login}</li>
        <li><strong>Star</strong> {data.starCount}</li>
        <li><a target="_blank" rel="noopener noreferrer" href={data.htmlUrl} title="Open repository link">Open repository url</a></li>
        <li><Link to={`/repos/${data.fullName}/commits`}>See latest commits</Link></li>
      </ul>
    </section>
  </article>
)

Repository.propTypes = {
  data: PropTypes.object.isRequired
}

export default Repository
