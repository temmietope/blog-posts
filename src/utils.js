/**
 * @typedef {{
 *  text: string,
 *  since: number,
 *  till: number,
 *  upvote: 'ASC'| 'DESC',
 * }} filter
 */

export const getSubredditCount = (subreddits = {}) => {
  const keys = Object.keys(subreddits)
  return keys.length
}

export const getPostCount = (subreddits = {}) => {
  const posts = Object.values(subreddits).flat()
  return posts.length
}

/**
 * function wrapper to extract posts from subreddits
 * matching the correct filter params
 *
 * @param {{string: []}} subs subreddit map
 * @param {string} key subreddit name
 * @param {filter} filter for search purposes
 *
 * @returns []
 */
export const withFilter = (subs, key, filter = {}) => {
  const {
    text = '',
    since = 1000,
    till = formatDate.endOfDayMS(),
    upvote = 'ASC',
  } = filter

  const sinceSecs = since / 1000
  const tillSecs = till / 1000

  const posts = subs[key] || []
  return posts
    .filter((p) => p.title.toLowerCase().includes(text.trim().toLowerCase()))
    .sort((x, y) => (upvote === 'DESC' ? x.ups - y.ups : y.ups - x.ups))
    .filter((p) => p.created_utc >= sinceSecs && p.created_utc <= tillSecs)
}

export const formatDate = {
  /**
   * @param{number} date milliseconds
   * @returns {Date} human formatted date
   */
  human: (date) =>
    new Intl.DateTimeFormat('en-NG', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    }).format(date * 1000),

  /**
   * formats date object, returns day month year
   * @param {Date} date
   * @returns YY-MM-DD
   */
  yymmdd: (date) => {
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const year = date.getFullYear()
    return year + '-' + month + '-' + day
  },

  /**
   * @param{Date} date
   */
  endOfDayMS: (date = new Date()) => {
    return new Date(new Date(date).setHours(23, 59, 59, 999)).getTime()
  },
}
