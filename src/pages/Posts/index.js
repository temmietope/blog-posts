import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Card from '../../components/Card'
import PropTypes from 'prop-types'
import { useLocation, Link } from 'react-router-dom'
import { setFilter } from '../../actions/posts'
import { withFilter, formatDate } from '../../utils'
import SkeletonCard from '../../components/PreloaderSkeleton'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import './style.css'

const Posts = () => {
  const [date, setDate] = useState({ since: '', till: '' })
  const dispatch = useDispatch()

  const location = useLocation()
  const path = location.state
    ? location.state
    : location.pathname.split('/').pop()

  const { posts, loading, filter } = useSelector(
    ({ posts: { posts, filter, loading } }) => ({
      posts: withFilter(posts, path, filter),
      filter,
      loading,
    }),
    shallowEqual,
  )

  const onDateFilter = (e) => {
    const { name, value } = e.target

    setDate({
      ...date,
      [name]: value,
    })

    const dateValue = {
      // end of day
      till: formatDate.endOfDayMS(value),
      since: new Date(value).getTime(),
    }

    dispatch(
      setFilter({
        ...filter,
        [name]: dateValue[name],
      }),
    )
  }

  return (
    <div className="posts">
      <header className="posts-header">
        <div className="backdrop">
          <img
            src="https://images.unsplash.com/photo-1502622796232-e88458466c33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80"
            alt="backdrop-img"
            className="backdrop-image"
          />
        </div>
        <h3>r/{path}</h3>
        <div className="go-back">
          <i className="fas fa-backward" />{' '}
          <Link to="/" className="link">
            Back to home
          </Link>
        </div>
      </header>
      <div className="posts-filter-div">
        <div className="posts-filter">
          <div className="search-posts">
            <span>
              <i className="fas fa-search" />
            </span>
            <input
              type="text"
              placeholder="Search posts"
              onChange={(e) => {
                dispatch(
                  setFilter({
                    ...filter,
                    text: e.target.value,
                  }),
                )
              }}
            />
          </div>

          <div className="date-filter">
            <p>Filter by Date</p>
            <form className="date-form">
              <div className="date-input">
                <div className="date-picker">
                  <div className="date-picker-label">
                    <span>From</span>
                  </div>
                  <div className="_date">
                    <input
                      type="date"
                      name="since"
                      onChange={onDateFilter}
                      max={formatDate.yymmdd(new Date())}
                      required
                    />
                  </div>
                </div>
                <div className="date-picker">
                  <div className="date-picker-label">
                    <span>To</span>
                  </div>
                  <div className="_date">
                    <input
                      type="date"
                      name="till"
                      onChange={onDateFilter}
                      max={formatDate.yymmdd(new Date())}
                      min={date.since}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="sort-posts">
            <input
              type="checkbox"
              defaultChecked={true}
              onChange={(e) => {
                dispatch(
                  setFilter({
                    ...filter,
                    upvote: e.target.checked ? 'ASC' : 'DESC',
                  }),
                )
              }}
            />
            <button className="toggle-order">
              Upvotes &nbsp;
              <i className="fas fa-sort-amount-up" />
            </button>
          </div>
        </div>
      </div>

      <div className="subreddit-posts-div">
        {loading ? (
          <SkeletonCard />
        ) : (
          <div className="subreddit-posts-div">
            {loading ? (
              <SkeletonCard />
            ) : (
              <>
                {posts.length ? (
                  <TransitionGroup className="subreddit-posts">
                    {posts.map((post, index) => {
                      return (
                        <CSSTransition
                          key={index}
                          timeout={500}
                          classNames="item"
                        >
                          <Card key={index} post={post} />
                        </CSSTransition>
                      )
                    })}
                  </TransitionGroup>
                ) : (
                  <div className="error-page">Nothing to display</div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

Posts.propTypes = {
  path: PropTypes.string,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
  subredditPosts: PropTypes.array,
}
export default Posts
