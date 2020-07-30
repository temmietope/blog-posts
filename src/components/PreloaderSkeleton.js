import React from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'

const SkeletonCard = ({ comp }) => {
  return (
    <div className={comp === 'home' ? 'skeleton-list' : 'posts-skeleton-list'}>
      {Array(9)
        .fill()
        .map((value, index) => (
          <div className="card" key={index}>
            <Skeleton height={250} width={`100%`} />
          </div>
        ))}
    </div>
  )
}
SkeletonCard.propTypes = {
  comp: PropTypes.string,
}
export default SkeletonCard
