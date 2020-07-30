import React, { useEffect } from 'react'
import { useDispatch, shallowEqual, useSelector } from 'react-redux'
import { fetchPosts } from '../../actions/posts'
import SubRedditCard from '../../components/SubRedditCard'
import PropTypes from 'prop-types'
import { getPostCount, getSubredditCount } from '../../utils'
import './style.css'
import SkeletonCard from '../../components/PreloaderSkeleton'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const SubReddits = () => {
  const dispatch = useDispatch()

  const { posts, hasErrors, loading } = useSelector(
    (state) => ({
      posts: state.posts.posts,
      loading: state.posts.loading,
      hasErrors: state.posts.hasErrors,
    }),
    shallowEqual,
  )

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <div>
      <header>
        <div className="container home-header-container">
          <div className="brand">
            <div className="brand-image">
              <img
                src="https://images.unsplash.com/photo-1595996403906-5548d25dd865?w=152&h=152&fit=crop&crop=faces"
                alt="brand"
              />
            </div>
            <div className="brand-name">
              <h1>Explore Reddit!</h1>
            </div>
            <div className="brand-stats">
              <ul>
                <li>
                  <span className="brand-stat-count">
                    {getSubredditCount(posts)}
                  </span>{' '}
                  subreddits
                </li>
                <li>
                  <span className="brand-stat-count">
                    {getPostCount(posts)}
                  </span>{' '}
                  posts
                </li>
              </ul>
            </div>
            <div className="brand-description">
              <p>
                <span className="brand-description-span">
                  Explore todays reddits trends
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="container home-container">
          {loading ? (
            <SkeletonCard comp="home" />
          ) : (
            <TransitionGroup className="gallery">
              {!hasErrors ? (
                Object.keys(posts).map((subreddit, index) => {
                  return (
                    <CSSTransition key={index} timeout={500} classNames="item">
                      <SubRedditCard name={subreddit} />
                    </CSSTransition>
                  )
                })
              ) : (
                <div className="error-page"> Nothing to display </div>
              )}
            </TransitionGroup>
          )}
        </div>
      </main>
    </div>
  )
}

SubReddits.propTypes = {
  posts: PropTypes.object,
  loading: PropTypes.bool,
  hasErrors: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default SubReddits
