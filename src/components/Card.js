import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import { formatDate } from '../utils'

import './style.css'

const Card = ({ post }) => {
  return (
    <div className="gallery-card" tabIndex={0}>
      <header className="gallery-card-header">
        <p className="info">
          <img
            src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
            className="subreddit-tag header"
            alt="tag"
          />
          <span className="category header">r/{post.subreddit} &nbsp;</span>
          <span className="date header">{formatDate.human(post.created_utc)}</span>
        </p>
        <h3 className="title">{post.title}</h3>
      </header>
      <div className="gallery-card-body">
        <Image imgSrc={post.thumbnail} />
        <div className="gallery-item-info">
          <ul>
            <li className="gallery-item-likes">
              <span className="visually-hidden">Likes: </span>
              <i className="fas fa-thumbs-up" aria-hidden="true" />
              &nbsp;{Number.parseInt(post.ups).toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>
              <span className="visually-hidden">Likes:</span>
              Posted by {post.author}
            </li>
          </ul>
        </div>
        <a href={post.url} rel="noopener noreferrer" target="_blank">
          <button className="go-to-reddit">
            View Post <i className="fas fa-location-arrow" />
          </button>
        </a>
      </div>
    </div>
  )
}

Card.propTypes = {
  post: PropTypes.object,
}

export default Card
