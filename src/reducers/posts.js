import {
  SET_LOADING,
  GET_POSTS_FAILURE,
  GET_POSTS_SUCCESS,
  SET_FILTER,
} from '../actions/types'

export const initialState = {
  posts: [],
  loading: false,
  hasErrors: false,
}

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
    }
    case GET_POSTS_SUCCESS:
      return {
        posts: action.payload,
        hasErrors: false,
    }
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }
    case GET_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        hasErrors: true,
      }
    default:
      return state
  }
}
