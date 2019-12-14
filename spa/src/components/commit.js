import React from 'react'
import PropTypes from 'prop-types'

const Commit = ({data}) => (
  <article>
    <section className="author-content">
      <div className="image-wrapper">
        <img src={data.authorAvatarUrl} alt={data.authorName} />
      </div>
    </section>
    <section className="more-content">
      <ul>
        <li><strong>SHA</strong> {data.sha}</li>
        <li><strong>Author</strong> {data.authorName}</li>
        <li><strong>Time</strong> {data.commitDatetime}</li>
        <li><strong>Message</strong> {data.commitMessage}</li>
      </ul>
    </section>
  </article>
)

Commit.propTypes = {
  data: PropTypes.object.isRequired
}

export default Commit
