import {
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  SET_LOADING,
  SET_FILTER,
} from './types'
const { fetcher } = require('./fetcher')

export const setLoading = (bool) => ({
  type: SET_LOADING,
  payload: bool,
})

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
})

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
})

export const setFilter = (payload) => ({
  type: SET_FILTER,
  payload,
})

export const fetchPosts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const subreddits = await fetcher()
    dispatch(getPostsSuccess(subreddits))
    dispatch(setLoading(false))
  } catch (error) {
    dispatch(getPostsFailure())
    dispatch(setLoading(false))
  }
}
