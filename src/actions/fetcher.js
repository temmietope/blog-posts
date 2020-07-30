const API_URL = 'https://www.reddit.com/.json'

/**
 * @param {Array<object>} posts
 * @returns {object}
 */
const postsBySubreddits = (posts) =>
  posts.children.reduce((acc, { data }) => {
    const { subreddit } = data
    acc[subreddit] = acc[subreddit]
      ? [...acc[subreddit], data]
      : [data]
    return acc
  }, {})

export const fetcher = async () => {
  const response = await fetch(API_URL)
  const { data } = await response.json()

  return postsBySubreddits(data)
}