import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Image = ({ imgSrc }) => {
  const [fallBack, setFallBack] = useState({
    fallbackSrc: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop",
    loaded: false,
    error: false,
  })

  const onImageLoaded = () => {
    setFallBack({ ...fallBack, loaded: true })
  }

  const onImageError = () => {
    setFallBack({ ...fallBack, error: true })
  }
  let src = !fallBack.error ? imgSrc : fallBack.fallbackSrc
  return (
    <img
      src={src}
      onLoad={onImageLoaded}
      onError={onImageError}
      alt="thumbnail"
      className="gallery-image"
    />
  )
}

Image.propTypes = {
  imgSrc: PropTypes.string,
}

export default Image
