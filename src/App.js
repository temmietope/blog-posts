import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPosts } from './actions/posts'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import SubReddits from './pages/SubReddits'
import Posts from './pages/Posts'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SubReddits} />
        <Route exact path="/r/:name" component={Posts} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
