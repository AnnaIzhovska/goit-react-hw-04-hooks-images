import s from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types'

function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  handleImageClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={s.ImageGalleryItem_image}
        onClick={() => {
          handleImageClick(largeImageURL, tags)
        }}
      />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  handleImageClick: PropTypes.func,
}

export default ImageGalleryItem
