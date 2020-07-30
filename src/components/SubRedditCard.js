import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './style.css'

const SubRedditCard = ({ name, history }) => {
  return (
    <div
      className="card"
      tabIndex={0}
      onClick={() => {
        history.push({
          pathname: `r/${name}`,
          state: name,
        })
      }}
    >
      <img
        src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
        className="gallery-image"
        alt="subreddit thumbnail"
      />
      <div className="card-info">
        <h2>r/{name}</h2>
      </div>
      <div className="gallery-item-info"></div>
    </div>
  )
}

SubRedditCard.propTypes = {
  name: PropTypes.string,
  history: PropTypes.object,
}

export default withRouter(SubRedditCard)
